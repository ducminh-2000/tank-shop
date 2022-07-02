import { NgChartsModule } from 'ng2-charts';
// Angular
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular in memory
// Perfect Scroll bar
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Env
// Hammer JS
import 'hammerjs';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
// Copmponents
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// Layout Services
import {
  KtDialogService,
  LayoutConfigService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
} from './core/_base/layout';
// Auth
import { AuthModule } from './views/pages/auth/auth.module';
// Config
import { LayoutConfig } from './core/_config/layout.config';
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import { SDKBrowserModule } from './api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotifierModule } from 'angular-notifier';
// import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageService } from './core/services/image.service';
import { PopupConfirmComponent } from './layout/popup-confirm/popup-confirm.component';
import { AuthInterceptor } from './core/auth/_guard/auth.interceptor';
import { DirectivesModule } from './core/directives/directives.module';
import { DeleteDialogComponent } from './core/dialogs/delete-dialog/delete-dialog.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDialogComponent } from './core/dialogs/common-dialog/common-dialog.component';
import { environment } from '../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

export function hljsLanguages(): HighlightLanguage[] {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './asset/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PopupConfirmComponent,
    DeleteDialogComponent,
    CommonDialogComponent,
  ],
  imports: [

    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    PartialsModule,
    CoreModule,
    AuthModule.forRoot(),
    TranslateModule.forRoot(),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,
    SDKBrowserModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
        },
      },
      behaviour: {
        autoHide: 2000,
        onClick: 'hide',
        // onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
    }),
    // Ng2ImgMaxModule,
    DirectivesModule,
    NgImageFullscreenViewModule,
    NgxSpinnerModule,
    CKEditorModule,
  ],
  exports: [],
  providers: [
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    KtDialogService,
    ImageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig,
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: { languages: hljsLanguages },
    },
    // template services
    MenuHorizontalService,
    MenuAsideService,
    NgxSpinnerService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupConfirmComponent,
    DeleteDialogComponent,
    CommonDialogComponent,
  ],
})
export class AppModule {}
