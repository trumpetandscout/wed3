/**
 * Created by Joel on 31.03.2017.
 */

import {Component} from '@angular/core';
import {Transaction} from "../models";

@Component({
  selector: 'wed-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.scss']
})
export class TransactionsComponent {
  public filter:Date;
  public transactions: Array<Transaction>;

  constructor(){
    this.refreshData(new Date(Date.now()));
  }

  private refreshData(filter:Date) {
    // transactions = repo.get(filter);
  }
}
