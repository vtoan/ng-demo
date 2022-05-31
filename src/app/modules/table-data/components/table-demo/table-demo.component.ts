import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PagingResponse } from '../../models/paging.model';
import { ProductResponse } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { GetAllProductRequest } from '../../types/product-request.type';
import { WrapperTableEvent } from '../wrapper-table/wrapper-table.component';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {
  data: ProductResponse[] = [];
  //
  columnNames = ['code', 'name', 'price', 'slug'];
  totalDataLength = 0;
  isLoading = false;

  constructor(private dataSer: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onTableChange(tableEvent: WrapperTableEvent) {
    console.log(tableEvent);
    this.loadData(tableEvent);
  }

  clearTable() {
    this.data = [];
    this.totalDataLength = 0;
  }

  updateTable(resp: PagingResponse<ProductResponse> | null) {
    if (resp) {
      this.data = [];
      this.totalDataLength = 0;
    }
  }

  private loadData(tableEvent?: WrapperTableEvent) {
    this.isLoading = true;
    this.dataSer
      .getRepoData(this.getObjectRequest(tableEvent))
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (resp) => this.updateTable(resp)
      });
  }

  // For change sort, paging
  private getObjectRequest(
    tableEvent?: WrapperTableEvent
  ): GetAllProductRequest {
    if (!tableEvent) {
      return {};
    }
    let reqObj: GetAllProductRequest = {
      sort: tableEvent.sortActive
        ? `${tableEvent.sortActive} ${tableEvent.sortDirection}`
        : undefined,
      page: tableEvent.pageIndex,
      size: tableEvent.pageSize
    };
    return reqObj;
  }
}
