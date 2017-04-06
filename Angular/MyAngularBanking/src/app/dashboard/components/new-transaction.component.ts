/**
 * Created by Joel on 31.03.2017.
 */

import {Component} from '@angular/core';
import {Account} from '../../auth/models/account';
import {Transaction} from '../models/transaction';
import {BankingService} from "../services/banking.service";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'wed-new-transaction',
  templateUrl: 'new-transaction.component.html',
  styleUrls: ['new-transaction.component.scss']
})
export class NewTransactionComponent {

  public account: Account;
  public lastTransaction: Transaction;
  public toAccountNr: number;
  public amount: number;

  constructor(private bankSvc: BankingService, private accSvc: AccountService) {

  }

  public isValidTransaction(): boolean {
    return false;
  }

  public getValidationTextToAccount(): string {
    return 'test';
  }

  public addNewTransaction() {
    this.bankSvc.addNewTransaction(new Transaction(new Date(Date.now()), this.account, this.accSvc.getAccount(this.toAccountNr), this.amount, 0));
  }
}
