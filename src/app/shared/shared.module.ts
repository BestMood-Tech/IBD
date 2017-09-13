import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataService } from './services/data.service';

@NgModule({})

export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DataService,
      ],
    };
  }
}
