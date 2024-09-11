import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  PeriodicElement } from '../../data';
import { DataLoadingService } from '../../services/data-loading.service';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.css',
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor(private dataLoadingService: DataLoadingService) {}

  ngOnInit() {
    this.dataLoadingService.getElements().subscribe(elements => {
      this.dataSource = new MatTableDataSource(elements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
