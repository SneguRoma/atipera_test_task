import {
  Component,
  effect,
  inject,
  signal,
  Signal,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ELEMENT_DATA, PeriodicElement } from '../../data';
import { DataLoadingService } from '../../services/data-loading.service';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { delay, Observable, of } from 'rxjs';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.css',
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  elements: Signal<PeriodicElement[]> = signal<PeriodicElement[]>([]);
  dialog = inject(MatDialog);
  delayLoad!: Observable<PeriodicElement[]>;

  constructor(private dataLoadingService: DataLoadingService) {
    effect(() => {
      this.dataSource.data = this.elements();
    });
  }
  ngOnInit() {
    this.delayLoad = of(ELEMENT_DATA).pipe(delay(1000));
    this.delayLoad.subscribe((elements) => {
      this.dataLoadingService.setElements(elements);
    });
    this.elements = this.dataLoadingService.getElements();
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
      if (result !== undefined) {
        this.dataLoadingService.updateElements(result);
      }
    });
  }
}
