import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { AccountGuard } from './guard/auth.guard';

@NgModule({})

export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthorizationService,
        AccountGuard
      ],
    };
  }
}
