/**
 * Created by Joel on 31.03.2017.
 */

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Account} from '../../shared';

import {AccountService, BankingService} from '../services';
import {NewTransactionInfo, AccountDetails} from '../models';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'wed-new-transaction',
  templateUrl: 'new-transaction.component.html',
  styleUrls: ['new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

  public ownAccountDetails: AccountDetails;
  public toAccountNr: number;
  public amount: number;

  public getAccountResponse: string;

  public submitName: string;
  public submitBalance: number;

  public isProcessing = false;
  public submitted = false;

  constructor(private bankSvc: BankingService, private accSvc: AccountService) {
    accSvc.getAccountDetails().subscribe(
      (data: AccountDetails) => {
        this.ownAccountDetails = data;
      }
    );
  }

  ngOnInit() {
    this.bankSvc.transactionAdded.subscribe(
      (transaction: Transaction) => {
        this.accSvc.getAccount(transaction.to).subscribe(
          (data: Account) => {
            this.submitName = data.firstname + ' ' + data.lastname;
            this.submitBalance = transaction.balance;
            this.submitted = true;
            this.isProcessing = false;
          });
      });
  }

  public onSubmit(accountNr: number): void {
    this.getAccountResponse = 'Überprüfe...';
    if (accountNr > 999999) {
      this.getAccount(accountNr);
    }
  }

  public getAccount(accountNr: number): void {
    this.accSvc.getAccount(accountNr).subscribe(
      (data: Account) => {
        if (data) {
          if (data.accountNr === this.ownAccountDetails.accountNr) {
            this.getAccountResponse = 'Bitte geben Sie die Ziel Konto Nummer ein.';
          } else {
            this.getAccountResponse = data.firstname + ' ' + data.lastname;
          }
        } else {
          this.getAccountResponse = 'Diese Ziel Konto Nummer ist ungültig';
        }
      });
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
