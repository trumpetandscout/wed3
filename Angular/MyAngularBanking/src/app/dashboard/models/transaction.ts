/**
 * Created by Joel on 31.03.2017.
 */

import {Account} from '../../shared';

export class Transaction {
  constructor(public date: Date,
              public from: Account,
              public to: Account,
              public amount: number,
              public balance: number) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(new Date(Date.parse(data.date)), data.from, data.target, data.amount, data.total);
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
