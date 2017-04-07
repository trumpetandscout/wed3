/**
 * Created by Joel on 07.04.2017.
 */

export class NewTransactionInfo {
  constructor(public toAccountNr: number,
              public amount: number) {
  }

  public static fromDto(data: any): NewTransactionInfo {
    return new NewTransactionInfo(data.toAccountNr, data.amount);
  }

  toDto(): any {
    return {
      toAccountNr: this.toAccountNr,
      amount: this.amount
    };
  }
}
