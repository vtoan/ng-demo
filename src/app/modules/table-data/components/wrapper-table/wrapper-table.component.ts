import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatColumnDef, MatNoDataRow, MatTable } from '@angular/material/table';
import { merge } from 'rxjs';

export interface WrapperTableEvent {
  sortActive: string;
  sortDirection: SortDirection;
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'wrapper-table',
  templateUrl: './wrapper-table.component.html',
  styleUrls: ['./wrapper-table.component.scss']
})
export class WrapperTable<T> implements AfterContentInit, AfterViewInit {
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow!: MatNoDataRow;

  @ViewChild(MatTable, { static: true }) table!: MatTable<T>;

  @Input() data!: T[];
  @Input() totalDataLength: number = 0;

  @Input() columnNames!: string[];

  // flag for table state
  @Input() isLoading: boolean = false;
  @Input() isEmpty: boolean = true;

  // sort default
  @Input() sort!: MatSort; // sort component must pass form outer component
  @Input() defaultSortActive: string = '';
  @Input() defaultSortDirection: SortDirection = '';

  // paging
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10, 15, 30];

  @Output() behaviorChange: EventEmitter<WrapperTableEvent> =
    new EventEmitter();

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.table.setNoDataRow(this.noDataRow);
  }

  ngAfterViewInit(): void {
    this.sort.active = this.defaultSortActive;
    this.sort.direction = this.defaultSortDirection;

    // If the user changes the sort order, reset back to the first page.
    this.sort?.sortChange.subscribe(() => this.paginator?.firstPage());
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      let change: WrapperTableEvent = {
        sortActive: this.sort.active,
        sortDirection: this.sort.direction,
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      };
      this.behaviorChange.emit(change);
    });
  }
}
