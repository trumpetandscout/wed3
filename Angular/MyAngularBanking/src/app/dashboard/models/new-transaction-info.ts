/**
 * Created by Joel on 07.04.2017.
 */

export class NewTransactionInfo {
  constructor(public target: number,
              public amount: number) {
  }

  public static fromDto(data: any): NewTransactionInfo {
    return new NewTransactionInfo(data.target, data.amount);
  }

  toDto(): any {
    return {
      target: this.target,
      amount: this.amount
    };
  }
}
