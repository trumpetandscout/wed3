/**
 * Created by Joel on 31.03.2017.
 */

import {Component} from '@angular/core';
import {Account} from '../../auth/models/account';
import {Transaction} from '../models/transaction';

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

  public isValidTransaction(): boolean {
    return false;
  }

  public getValidationTextToAccount(): string {
    return 'test';
  }

  public addNewTransaction() {
    bankSvc.addNewTransaction(new Transaction(new Date(Date.now()), account, accSvc.getAccount(toAccountNr), amount, 0));
  }
}
