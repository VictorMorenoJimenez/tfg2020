import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent implements OnInit {
  @ViewChild('topPaginator')
  topPaginator: MatPaginator;
  @ViewChild('bottomPaginator')
  bottomPaginator: MatPaginator;

  @Input()
  pageSizeOptions = [10, 20, 50];
  @Input()
  paginatorConfig = 'both'; // both, bottom, top, none
  @Input()
  styleConfig = 'big'; // // big, medium or small
  @Input()
  resultsCount = 0;
  @Input()
  loading = false;

  @Input()
  export: any;

  constructor() {}

  ngOnInit(): void {
    if (this.styleConfig === 'small' || this.styleConfig === 'medium') {
      this.pageSizeOptions = [10];
      this.paginatorConfig = 'bottom';
    }
  }

  syncPaginators(event: PageEvent): void {
    if (
      this.topPaginator &&
      (this.topPaginator.pageSize !== event.pageSize ||
        this.topPaginator.pageIndex !== event.pageIndex)
    ) {
      // Changes in bottom Paginator
      this.topPaginator.pageSize = event.pageSize;
      this.topPaginator.pageIndex = event.pageIndex;
      // The bottom paginator is not connected with the dataSource
      // so we need to emit the event to actually change the page
      this.topPaginator.page.emit(event);
    } else {
      // Changes in top paginator
      if (this.bottomPaginator) {
        this.bottomPaginator.pageSize = event.pageSize;
      }
      if (this.bottomPaginator) {
        this.bottomPaginator.pageIndex = event.pageIndex;
      }
    }
  }
}
