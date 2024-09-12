import { Injectable, signal, WritableSignal } from '@angular/core';
import { PeriodicElement } from '../data';

@Injectable({
  providedIn: 'root',
})
export class DataLoadingService {
  private elementsSignal = signal<PeriodicElement[]>([]);

  getElements(): WritableSignal<PeriodicElement[]> {
    return this.elementsSignal;
  }

  setElements(elements: PeriodicElement[]): void {
    this.elementsSignal.set(elements);
  }

  updateElements(updateElement: PeriodicElement): void {
    return this.elementsSignal.update((elements) => {
      return elements.map((element) =>
        element.position === updateElement.position ? updateElement : element,
      );
    });
  }
}
