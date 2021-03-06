/**
 * Created by CjHome on 01.04.2017.
 */

import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {Account} from '../../shared';
import {AccountDetails} from '../models';

import {AccountResourceService} from '../resources';

@Injectable()
export class AccountService {
  constructor(private resource: AccountResourceService) {
  }

  public getAccount(accountNr: number): Observable<Account> {
    return this.resource.getAccount(accountNr);
  }

  public getAccountDetails(): Observable<AccountDetails> {
    return this.resource.getAccountDetails();
  }
}
