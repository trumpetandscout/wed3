/**
 * Created by Joel on 31.03.2017.
 */

import {Component, OnInit} from '@angular/core';
import {Transaction} from '../models';
import {BankingService} from '../services';

@Component({
  selector: 'wed-last-transactions',
  templateUrl: 'last-transactions.component.html',
  styleUrls: ['last-transactions.component.scss']
})
export class LastTransactionsComponent implements OnInit {
  public lastTransactions: Array<Transaction>;

  constructor(private bankSvc: BankingService) {
    this.bankSvc.getLastN(3).subscribe(
      (data: Array<Transaction>) => {
        this.lastTransactions = data;
      }
    );
  }

  ngOnInit() {
    this.bankSvc.transactionAdded.subscribe(
      (transaction: Transaction) => {
        this.bankSvc.getLastN(3).subscribe(
          (data: Array<Transaction>) => {
            this.lastTransactions = data;
          }
        );
      });
  }
}
