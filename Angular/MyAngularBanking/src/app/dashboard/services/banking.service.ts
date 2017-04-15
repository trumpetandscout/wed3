/**
 * Created by CjHome on 01.04.2017.
 */

import {EventEmitter, Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {NewTransactionInfo, Transaction} from '../models';
import {BankResourceService} from '../resources';

@Injectable()
export class BankingService {
  public transactionAdded: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  constructor(private resource: BankResourceService) {
  }

  public doPay(model: NewTransactionInfo): void {
    this.resource.doPay(model).subscribe(
      (data: Transaction) => {
        if (data) {
          this.transactionAdded.emit(data);
        }
      });
  }

  public doFilter(date: Date): Observable<Array<Transaction>> {
    const fromDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    let toDate;
    if (date.getMonth() === 11) {
      toDate = new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
    } else {
      toDate = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
    }
    return this.resource.doFilter(fromDate, toDate);
  }

  public getLastN(n: number): Observable<Array<Transaction>> {
    return this.resource.getLastN(n);
  }
}
