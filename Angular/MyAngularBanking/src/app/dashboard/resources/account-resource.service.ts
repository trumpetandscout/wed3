/**
 * Created by Joel on 13.04.2017.
 */

import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";

import {ResourceBase, Account} from "../../shared";
import {AccountDetails} from "../models";

@Injectable()
export class AccountResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public getAccount(accountNr: number): Observable<Account> {
    return this.get('accounts/' + accountNr)
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return Account.fromDto(result);
        }
        return null;
      })
      .catch((error:any) => {
        return Observable.of<Account>(null);
      });
  }

  public getAccountDetails(): Observable<AccountDetails> {
    return this.get('accounts')
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return AccountDetails.fromDto(result);
        }
        return null;
      })
      .catch((error:any) => {
        return Observable.of<AccountDetails>(null);
      });
  }
}
