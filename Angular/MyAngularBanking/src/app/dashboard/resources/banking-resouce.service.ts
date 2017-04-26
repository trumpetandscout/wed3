/**
 * Created by Joel on 13.04.2017.
 */

import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {NewTransactionInfo, Transaction} from '../models';
import {ResourceBase} from '../../shared';

@Injectable()
export class BankResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public doPay(model: NewTransactionInfo): Observable<Transaction> {
    return this.post('/accounts/transactions', model)
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return Transaction.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Transaction>(null);
      });
  }

  public doFilter(fromDate: Date, toDate: Date): Observable<Array<Transaction>> {
    return this.get('/accounts/transactions?fromDate=' + fromDate.toJSON() + '&toDate=' + toDate.toJSON())
      .map((response: Response) => {
        const result = response.json().result;
        if (result) {
          return result.map(r => Transaction.fromDto(r));
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Array<Transaction>>(null);
      });
  }

  public getLastN(n: number): Observable<Array<Transaction>> {
    return this.get('/accounts/transactions?count=' + n)
      .map((response: Response) => {
        const result = response.json().result;
        if (result) {
          return result.map(r => Transaction.fromDto(r));
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Array<Transaction>>(null);
      });
  }
}
