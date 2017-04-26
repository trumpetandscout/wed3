import {NgModule, ModuleWithProviders} from '@angular/core';
import {RequestOptions} from '@angular/http';

import {AuthService, SecurityTokenStore} from './services';
import {AuthResourceService, AuthRequestOptions} from './resources';

import {LoginComponent, LogoutComponent, RegisterComponent} from './components';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent, LogoutComponent, RegisterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent, LogoutComponent, RegisterComponent
  ],
  providers: [ ]
})
export class AuthModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: AuthModule,
      providers: [
        // DI Providers (Services, Tokens, Factories...) to be used globally and instantiated only once
        AuthResourceService,
        AuthService,
        SecurityTokenStore,
        {
          provide: RequestOptions,
          useFactory: AuthRequestOptions.createFromTokenStore,
          deps: [SecurityTokenStore]
        }]
    };
  }
}
