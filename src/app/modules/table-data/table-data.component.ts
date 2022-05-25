import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html'
})
export class TableDataComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getRepoData().subscribe((resp) => {
    //   console.log(resp);
    // });
  }
}
