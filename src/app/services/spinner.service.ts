import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinnerBehavior = new BehaviorSubject<Boolean>(false);
  spinnerAction$ = this.spinnerBehavior.asObservable();

  show(flag: boolean) {
    this.spinnerBehavior.next(flag);
  }
}
