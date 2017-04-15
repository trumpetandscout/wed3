import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {AuthModule} from "../auth/auth.module";

import {WelcomeRoutingModule} from "./welcome-routing.module";
import {WelcomeComponent} from "./welcome.component";


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    WelcomeRoutingModule, SharedModule, AuthModule
  ],
  exports: [
    WelcomeComponent
  ],
  providers: [ ]
})
export class WelcomeModule {
  static forRoot(config?:{}) : ModuleWithProviders {
    return {
      ngModule: WelcomeModule,
      providers: [ ]
    };
  }

}
