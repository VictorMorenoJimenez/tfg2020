import { AfterViewInit, Input, OnDestroy, OnInit, ViewChild, Directive } from '@angular/core';
import {PaginatedTableComponent} from '@fuse/components/paginated-table/paginated-table.component';
import {DataModelResult, UtilsDataSource, ServiceForm} from './datasource.datasource';
import {Permissions} from './permissions.class';
import {PydrfpermissionsPydrfpermissionsFormService} from 'api/form-service';
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';

/**
 * Sincronize top and bottom paginators
 */
@Directive()
export class UtilsTable<Element,
    DataModel extends DataModelResult<Element>,
    Service extends ServiceForm<DataModel>>
    extends Permissions
    implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    formService: Service;

    @ViewChild('paginatedTable') paginatedTable: PaginatedTableComponent;

    @Input()
    displayedColumns = []; // Columns to show
    displayedColumnsMedium = []; // Columns to show in small config
    displayedColumnsSmall = []; // Columns to show in small config
    @Input()
    showHeaderRow = true;
    @Input()
    showSearch = true;
    @Input()
    styleConfig = 'big'; // big or small (without pagesizes, search, top paginator and small 'no results',)

    dataSource: UtilsDataSource<Element, DataModel, Service>;

    constructor(public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
                public _fuseNavigationService: FuseNavigationService) {
        super(permissionsFormService, _fuseNavigationService);
    }

    ngOnInit(): void {
        if (this.styleConfig === 'small') {
            this.displayedColumns = this.displayedColumnsSmall; // Columns to show
            this.showHeaderRow = false;
            this.showSearch = false;
        }

        if (this.styleConfig === 'medium') {
            this.displayedColumns = this.displayedColumnsMedium; // Columns to show
            this.showSearch = false;
        }

        // Connect with the data source
        this.formService.reset();
        this.dataSource =
            new UtilsDataSource<Element,
                DataModel,
                Service>(this.formService);
    }

    ngAfterViewInit(): void {
        // Connect the paginator with the dataSource when they are initialized
        this.dataSource.paginator = this.paginatedTable.topPaginator || this.paginatedTable.bottomPaginator;

        setTimeout(() => {
            this.dataSource.loadList();
        });
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
    }

    /**
     * Reload list
     */
    public reload(): void {
        if (this.paginatedTable.topPaginator) {
            this.paginatedTable.topPaginator.pageIndex = 0;
        }
        if (this.paginatedTable.bottomPaginator) {
            this.paginatedTable.bottomPaginator.pageIndex = 0;
        }
        // Get Attributes
        this.dataSource.loadList();
    }

    /**
     * Clear search input
     */
    clearSearch(key): void {
        const obj = {};
        obj[key] = '';
        this.formService.form.patchValue(obj);
        this.reload();
    }
}
