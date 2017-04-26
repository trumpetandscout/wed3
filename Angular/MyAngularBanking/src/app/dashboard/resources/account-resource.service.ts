/**
 * Created by Joel on 13.04.2017.
 */

import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


import {ResourceBase} from '../../shared';
import {AccountDetails, AccountName} from '../models';

@Injectable()
export class AccountResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public getAccount(accountNr: number): Observable<AccountName> {
    return this.get('/accounts/' + accountNr)
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return AccountName.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<AccountName>(null);
      });
  }

  public getAccountDetails(): Observable<AccountDetails> {
    return this.get('/accounts/')
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return AccountDetails.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<AccountDetails>(null);
      });
  }
}
