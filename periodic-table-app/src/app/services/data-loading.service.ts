import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PeriodicElement, ELEMENT_DATA } from '../data';

@Injectable({
  providedIn: 'root',
})
export class DataLoadingService {
  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(1000));
  }
}
