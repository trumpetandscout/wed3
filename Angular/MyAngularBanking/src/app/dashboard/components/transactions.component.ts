/**
 * Created by Joel on 31.03.2017.
 */

import {Component} from '@angular/core';
import {Transaction} from '../models';
import {BankingService} from "../services/banking.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'wed-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.scss']
})
export class TransactionsComponent {
  public years: Array<number> = [2017, 2016, 2015];
  public months: Array<string> = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  public yearSelect: number;
  public monthSelect: number;

  public transactions: Array<Transaction>;

  constructor(private bankSvc: BankingService) {
    this.bankSvc.doFilter(new Date(Date.now())).subscribe(
      (data: Array<Transaction>) => {
        this.transactions = data;
      }
    );
  }

  public refreshData() {
    this.bankSvc.doFilter(new Date(this.years[this.yearSelect], this.monthSelect, 1, 2, 0, 0, 0)).subscribe(
      (data: Array<Transaction>) => {
        this.transactions = data;
      }
    );
  }
}
