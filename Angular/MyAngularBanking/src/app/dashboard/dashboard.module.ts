import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from "../shared/shared.module";

import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./components/dashboard.component";
import {TransactionsComponent} from "./components/transactions.component";
import {NewTransactionComponent} from "./components/new-transaction.component";
import {LastTransactionsComponent} from "./components/last-transactions.component";
import {HomeComponent} from "./components/home.component";
import {AuthModule} from "../auth/auth.module";
import {BankingService} from "./services/banking.service";
import {AccountService} from "./services/account.service";
import {BankResourceService} from "./resources/banking-resouce.service";

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    TransactionsComponent,
    NewTransactionComponent,
    LastTransactionsComponent
  ],
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, DashboardRoutingModule, AuthModule
  ],
  exports: [
    // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
  ],
  providers: [
    BankingService,
    BankResourceService,
    AccountService
    // DI Providers (Services, Tokens, Factories...), may be instantiated multiple times
  ]
})
export class DashboardModule {
  static forRoot(config?:{}) : ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [ ]
    };
  }

}
