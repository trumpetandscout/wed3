/**
 * Created by Joel on 31.03.2017.
 */

export class Transaction {

  public static fromDto(data: any): Transaction {
    return new Transaction(new Date(Date.parse(data.date)), data.from, data.target, data.amount, data.total);
  }

  constructor(public date: Date,
              public from: number,
              public to: number,
              public amount: number,
              public balance: number) {
  }

  toDto(): any {
    return {
      from: this.from,
      target: this.to,
      amount: this.amount,
      total: this.balance,
      date: this.date.toJSON()
    };
  }
}
