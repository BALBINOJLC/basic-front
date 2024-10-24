import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  private communicateDrawerSubject = new BehaviorSubject<boolean>(false);
  communicateDrawer(event: boolean): void {
    this.communicateDrawerSubject.next(event);
  }

  getCommunicateDrawer(): BehaviorSubject<boolean> {
    return this.communicateDrawerSubject;
  }
}
