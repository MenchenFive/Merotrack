import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';
import { map } from 'rxjs/operators';

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

@Injectable()
export class NbSimpleRoleProvider extends NbRoleProvider {

  constructor (private authService: NbAuthService) {
    super();
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          console.debug('logged as role: ' + token.getPayload()['permissions']);
          return token.isValid() && !!token.getPayload()['permissions'] ? token.getPayload()['permissions'] : 'norole';
        }),
      );
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: 'http://localhost:8090',
        login: {
          endpoint: '/login',
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: '/pages',
          },
        },
        logout: {
          endpoint: '',
          method: 'post',
          redirect: {
              success: '/',
              failure: '/',
          },
        },
      }),
    ],
    forms: {},
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      norole: {
        view: '',
        insert: '',
        remove: '',
      },
      standard: {
        view: ['trips', 'fleet', 'incidences'],
        insert: ['trips', 'incidences'],
        remove: ['trips', 'incidences'],
      },
      admin: {
        view: '*',
        insert: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
