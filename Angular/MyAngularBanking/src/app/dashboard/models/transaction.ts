/**
 * Created by Joel on 31.03.2017.
 */
import {Account} from "../../auth/models/account";

export class Transaction {
  constructor(public date: Date,
              public from: Account,
              public to: Account,
              public amount: number,
              public balance: number) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(data.date, data.from, data.to, data.amount, data.balance);
  }

  toDto(): any {
    return {
      date: this.date,
      from: this.from,
      to: this.to,
      amount: this.amount,
      balance: this.balance
    };
  }
}
