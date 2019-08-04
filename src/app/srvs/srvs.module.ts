import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import { LayoutService, PlayerService, StateService} from '../@core/utils';
import {UserData} from '../@core/data/users';
import {UserService} from '../@core/mock/users.service';
import {of as observableOf} from 'rxjs';


export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

export const YW_CORE_PROVIDERS = [
   DATA_SERVICES,
   NbAuthModule.forRoot({
     strategies: [
       NbPasswordAuthStrategy.setup({
         name: 'email',
         baseEndpoint: '',
         login: {
           endpoint: '/api/auth/login',
           redirect: {
             success: '/dashboard',
             failure: null,
           },
         },
         register: {
           endpoint: '/api/auth/register',
           redirect: {
             success: '/dashboard',
             failure: null,
           },
         },
       }),
     ],
     forms: {},
   }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: ['view', 'user'],
      },
      user: {
        parent: 'guest',
        create: 'comments',
      },
      moderator: {
        parent: 'user',
        create: 'news',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  LayoutService,
  PlayerService,
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
export class SrvsModule {
  constructor(@Optional() @SkipSelf() parentModule: SrvsModule) {
    throwIfAlreadyLoaded(parentModule, 'SrvsModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SrvsModule,
      providers: [
        ...YW_CORE_PROVIDERS,
      ],
    };
  }
}
