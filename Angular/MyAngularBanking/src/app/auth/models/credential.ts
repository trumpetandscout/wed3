import {Injectable} from '@angular/core';

import {Account} from '../../shared';

@Injectable()
export class Credential {

  public static fromDto(data: any): Credential {
    return new Credential(data.token, Account.fromDto(data.owner));
  }

  constructor(
    public token: string,
    public owner: Account) {
  }

  toDto(): any {
    return {
      token: this.token,
      owner: (this.owner) ? this.owner.toDto() : null
    };
  }
}
