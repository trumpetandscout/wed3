/**
 * Created by CjHome on 15.04.2017.
 */

export class AccountName {

  public static fromDto(data: any): AccountName {
    return new AccountName(data.accountNr, data.owner.firstname, data.owner.lastname);
  }

  constructor(public accountNr: string,
              public firstname: string,
              public lastname: string) {
  }

  toDto(): any {
    return {
      accountNr: this.accountNr,
      owner: {firstname: this.firstname, lastname: this.lastname}
    };
  }
}
