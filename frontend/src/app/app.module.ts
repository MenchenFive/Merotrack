/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularHalModule } from 'angular4-hal';
import { ExternalConfigurationService } from './ExternalConfigurationService';
import { PipesModule } from './@core/data/pipes/pipes.module';
import { NbDialogModule } from '@nebular/theme';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NgxAuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { NbSecurityModule } from '@nebular/security';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularHalModule.forRoot(),
    NgbModule.forRoot(),
    NbDialogModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    PipesModule,
    NgxAuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
  ],
})
export class AppModule {

}
