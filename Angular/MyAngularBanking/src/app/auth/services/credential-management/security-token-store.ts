import {Injectable} from '@angular/core';

@Injectable()
export class SecurityTokenStore {
  private token: SecurityToken;

  constructor() {
  }

  public get storedValue(): SecurityToken {
    return JSON.parse(localStorage.getItem('User'));
  }

  public set storedValue(value: SecurityToken) {
    this.token = value;
    if (!value) {
      localStorage.removeItem('User');
    } else {
      localStorage.setItem('User', JSON.stringify(value));
    }
  }
}

export interface SecurityToken {
  token: string;
  owner: any;
}
