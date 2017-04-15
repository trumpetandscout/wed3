/**
 * Created by Joel on 07.04.2017.
 */

export class NewTransactionInfo {

  public static fromDto(data: any): NewTransactionInfo {
    return new NewTransactionInfo(data.target, data.amount);
  }

  constructor(public target: number,
              public amount: number) {
  }

  toDto(): any {
    return {
      target: this.target,
      amount: this.amount
    };
  }
}
