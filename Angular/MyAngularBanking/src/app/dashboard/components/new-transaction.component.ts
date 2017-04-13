/**
 * Created by Joel on 31.03.2017.
 */

import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Account} from '../../auth/models/account';
import {Transaction} from '../models';

import {AccountService, BankingService} from "../services";
import {NewTransactionInfo} from "../models";

@Component({
  selector: 'wed-new-transaction',
  templateUrl: 'new-transaction.component.html',
  styleUrls: ['new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit{

  public account: Account;
  public toAccountNr: number;
  public amount: number;

  public isProcessing:boolean = false;

  constructor(private bankSvc: BankingService, private accSvc: AccountService) {

  }

  ngOnInit() {
    this.bankSvc.transactionAdded.subscribe(
      (transacction) => {
        this.isProcessing = false;
      });
  }

  public isValidTransaction(): boolean {
    return false;
  }

  public getValidationTextToAccount(): string {
    return 'test';
  }

  public doPay(f: NgForm): void {
    if (f.valid) {
      this.isProcessing = true;
      this.bankSvc.doPay(new NewTransactionInfo(
        f.value.toAccountNr,
        f.value.amount));
    }
  }
}
