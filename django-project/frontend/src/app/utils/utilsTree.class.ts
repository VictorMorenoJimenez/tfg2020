import { AfterViewInit, Input, OnDestroy, OnInit, ViewChild, Directive } from '@angular/core';
import {DataModelResult, UtilsDataSource, ServiceForm} from './datasource.datasource';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(public id: number,
                public item: string,
                public level = 1,
                public has_children = false,
                public isLoading=false) {}
}

@Directive()
export class UtilsTree<Element,
    DataModel extends DataModelResult<Element>,
    Service extends ServiceForm<DataModel>>
    implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    formService: Service;

    dataSource: UtilsDataSource<Element, DataModel, Service>;

    constructor() {}

    ngOnInit(): void {
        // Connect with the data source
        this.formService.reset();
        this.dataSource =
            new UtilsDataSource<Element,
                DataModel,
                Service>(this.formService);
    }

    ngAfterViewInit(): void {
        this.dataSource.loadList();
    }

    ngOnDestroy(): void {
        if(this.dataSource){
            this.dataSource.disconnect();
        }
    }

    /**
     * Reload list
     */
    public reload(): void {
        // Get Attributes
        this.dataSource.loadList();
    }
}
