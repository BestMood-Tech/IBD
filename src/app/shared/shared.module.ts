import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { AccountGuard } from './guard/auth.guard';
import { WebSocketsService } from './services/web-sockets.service';

@NgModule({})

export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthorizationService,
        AccountGuard,
        WebSocketsService,
      ],
    };
  }
}
