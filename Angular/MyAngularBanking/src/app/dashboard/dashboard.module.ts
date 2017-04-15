import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AuthModule} from '../auth/auth.module';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent, TransactionsComponent, NewTransactionComponent, LastTransactionsComponent, HomeComponent} from './components';

import {BankingService, AccountService} from './services';
import {BankResourceService, AccountResourceService} from './resources';

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
    SharedModule, AuthModule, DashboardRoutingModule
  ],
  exports: [
    // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
  ],
  providers: [
    BankingService,
    BankResourceService,
    AccountService,
    AccountResourceService
    // DI Providers (Services, Tokens, Factories...), may be instantiated multiple times
  ]
})
export class DashboardModule {
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [ ]
    };
  }

}
