import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableDataRoutingModule } from './table-data-routing.module';
import { TableViewComponent } from './components/table-view/table-view.component';
import { TableDataComponent } from './table-data.component';
import { DataService } from './services/data.service';
import { MaterialModule } from './material.module';
import { TableDemoComponent } from './components/table-demo/table-demo.component';
import { WrapperTable } from './components/wrapper-table/wrapper-table.component';

@NgModule({
  declarations: [
    TableDataComponent,
    TableViewComponent,
    WrapperTable,
    TableDemoComponent
  ],
  imports: [
    CommonModule,
    TableDataRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [DataService]
})
export class TableDataModule {}
