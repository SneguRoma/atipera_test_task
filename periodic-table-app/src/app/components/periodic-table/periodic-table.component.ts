import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../data';
import { DataLoadingService } from '../../services/data-loading.service';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.css',
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: MatTableDataSource<PeriodicElement>;
  readonly dialog = inject(MatDialog);

  constructor(private dataLoadingService: DataLoadingService) {}

  ngOnInit() {
    this.dataLoadingService.getElements().subscribe((elements) => {
      this.dataSource = new MatTableDataSource(elements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        row = result;
        console.log('result', result);
      }
    });
  }
}
