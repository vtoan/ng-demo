import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { ProductResponse } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { GetAllProductRequest } from '../../types/product-request.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {
  @Input() query!: string;
  @Input() filter!: string;

  displayedColumns: string[] = ['code', 'name', 'price', 'slug'];
  data: ProductResponse[] = [];

  // flag for table state
  isLoadingResults = true;
  isFirstLoading = true;
  isEmpty = false;

  // sort default
  defaultSortActive!: string;
  defaultSortDirection: SortDirection = '';

  // paging
  resultsLength = 0;
  pageSizeOptions = [5, 10, 15, 30];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // Flip flag to show loading.
          this.isLoadingResults = true;
          this.data = [];

          return this.dataService
            .getRepoData(this.getObjectRequest())
            .pipe(catchError(() => of(null)));
        }),
        map((resp: any) => {
          // Flip flag to show that loading has finished.
          if (this.isFirstLoading) {
            this.isFirstLoading = false;
          }
          this.isLoadingResults = false;
          this.isEmpty = resp === null;

          if (resp === null) {
            return [];
          }

          this.resultsLength = resp.total;
          return resp.data;
          // return [];
        })
      )
      .subscribe((data) => (this.data = data));
  }

  private getObjectRequest(): GetAllProductRequest {
    let reqObj: GetAllProductRequest = {
      sort: this.sort.active
        ? `${this.sort.active} ${this.sort.direction}`
        : undefined,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize
    };
    return reqObj;
  }
}
