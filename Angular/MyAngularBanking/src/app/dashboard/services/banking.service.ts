/**
 * Created by CjHome on 01.04.2017.
 */

import {EventEmitter, Injectable} from '@angular/core';
import {NewTransactionInfo, Transaction} from '../models';

@Injectable()
export class BankingService {

  public transactionAdded:EventEmitter<Transaction> = new EventEmitter<Transaction>();

  public doPay(newTransactionModel: NewTransactionInfo): void{

  }
}
