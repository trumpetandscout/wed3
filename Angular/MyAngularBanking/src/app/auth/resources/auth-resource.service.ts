import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {LoginInfo, RegistrationInfo, Credential} from '../models';
import {ResourceBase, Account} from '../../shared';

@Injectable()
export class AuthResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public register(model: RegistrationInfo): Observable<Account> {
    return this.post('/auth/register', model.toDto())
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return Account.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Account>(null);
      });
  }

  public login(model: LoginInfo): Observable<Credential> {
    return this.post('/auth/login', model.toDto())
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return Credential.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Credential>(null);
      });
  }
}
