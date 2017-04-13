/**
 * Created by Joel on 31.03.2017.
 */

import {Component} from '@angular/core';
import {Transaction} from "../models/transaction";
import {BankingService} from "../services/banking.service";

@Component({
  selector: 'wed-last-transactions',
  templateUrl: 'last-transactions.component.html',
  styleUrls: ['last-transactions.component.scss']
})
export class LastTransactionsComponent {
  public lastTransactions: Array<Transaction>;

  constructor(private bankSvc: BankingService) {
    this.bankSvc.getLastN(3).subscribe(
      (data: Array<Transaction>) => {
        this.lastTransactions = data;
      }
    );;
  }
}
