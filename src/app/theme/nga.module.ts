import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';

import {
  BaBackTop,
  BaCard,
  BaMenu,
  BaMenuItem,
  BaPageTop,
  BaSidebar,
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import { BaScrollPosition, BaSlimScroll, BaThemeRun } from './directives';

import { BaImageLoaderService, BaMenuService, BaThemePreloader, BaThemeSpinner } from './services';

import { BaThemeConfigProvider } from './theme.configProvider';

import { EmailValidator, EqualPasswordsValidator } from './validators';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaMenuItem,
  BaMenu,
  BaPageTop,
  BaSidebar,
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur,
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService,
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator,
];

@NgModule({
  declarations: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule,
  ],
  exports: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
})
export class NgaModule {
  public static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,
      ],
    };
  }
}
