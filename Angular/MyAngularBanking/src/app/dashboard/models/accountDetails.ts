import {Account} from '../../shared';

export class AccountDetails {

  public static fromDto(data: any): AccountDetails {
    return new AccountDetails(data.ownerId, data.accountNr, data.amount, Account.fromDto(data.owner));
  }

  constructor(public ownerId: string,
              public accountNr: string,
              public amount: number,
              public owner: Account) {
  }

  toDto(): any {
    return {
      ownerId: this.ownerId,
      accountNr: this.accountNr,
      amount: this.amount,
      owner: this.owner.toDto()
    };
  }
}
