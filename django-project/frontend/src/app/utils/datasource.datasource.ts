import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { finalize, catchError, map, tap, delay } from 'rxjs/operators';
import {ExcelService} from './providers/excel.service';

export interface ServiceForm<DataModel> {
    form: FormGroup;
    submit(value?: any, cache?: boolean, only_cache?: boolean): Observable<DataModel>;
    reset(): void;
}

export interface DataModelResult<Element> {
    count: number;
    results: Element[];
}

export class UtilsDataSource<Element,
                             DataModel extends DataModelResult<Element>,
                             Service extends ServiceForm<DataModel>>
                             implements DataSource<Element> {

    public listSubject = new BehaviorSubject<Element[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    private _paginator: MatPaginator | null;
    private formServiceSub: Subscription;

    public loading$ = this.loadingSubject.asObservable();       // Expose loading as an observable
    public count$ = this.countSubject.asObservable();           // Expose count as an observable
    public elements$ = this.listSubject.asObservable();
    constructor(public formService: Service) {

    }

    /**
     * Load a list of attributes from the server
     * The limit and offset is calculated from the paginator current page
     */
    loadList(): void {
        this.loadingSubject.next(true);   // Set loading true

        if (this._paginator){
            this.formService.form.patchValue({
                limit: this._paginator.pageSize,
                offset: this._paginator.pageIndex * this._paginator.pageSize,
                xls_format: null
            });
        }

        this.formServiceSub = this.formService.submit().pipe(
            map(entities => {
                this.listSubject.next(entities.results);    // Set the attributes
                this.countSubject.next(entities.count);           // Set the count
            }),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))         // Set loading to false
        ).subscribe();
    }

    exportAsXLSX(title?: string): void {
        this.loadingSubject.next(true);   // Set loading true

        const excelService = new ExcelService();
        this.formService.form.patchValue({
            xls_format: true
        });
        this.formServiceSub = this.formService.submit(false, false).pipe(
            map(entities => {
                excelService.exportAsExcelFile((<any>entities), (title || 'data'));
            }),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))         // Set loading to false
        ).subscribe();

    }

    /**
     * Check if the current page is empty and reload the page
     */
    loadAfterElementRemoved(): void {
        // Check if we run out of elements in the current page
        if (this._paginator){
            const currentPageStart = this._paginator.pageIndex * this._paginator.pageSize;

            if (currentPageStart >= this.countSubject.value - 1 && this._paginator.pageIndex > 0) {
                this._paginator.previousPage(); // Will emit a page event where loadAttribute is invoked
            } else {
                this.loadList();
            }
        }
    }

    /**
     * Set paginator and subscribe to page changes
     * Remember to call this method once the paginator is initialized
     */
    set paginator(paginator: MatPaginator | null) {
        if (paginator){
            this._paginator = paginator;

            // Reload elements when we change pages
            this._paginator.page
                .pipe(
                    tap(() => this.loadList())
                )
                .subscribe();
        }
    }

    /**
     * Used by the MatTable. Called when it connects to the data source.
     */
    connect(collectionViewer: CollectionViewer): Observable<Element[]> {
        return this.listSubject.asObservable();
    }

    /**
     * Used by the MatTable. Called when it is destroyed.
     */
    disconnect(collectionViewer?: CollectionViewer): void {
        this.listSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
        this.formServiceSub.unsubscribe();
        if (this._paginator){
            this._paginator.page.unsubscribe();
        }
    }

}
