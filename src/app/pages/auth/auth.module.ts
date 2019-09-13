import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  getDeepFromObject,
  NbAuthModule,
  NbAuthSimpleToken,
  NbPasswordAuthStrategy,
  NbPasswordAuthStrategyOptions,
} from '@nebular/auth';
import {NgxAuthRoutingModule} from './auth-routing.module';

import {
  NbAlertModule,
  NbInputModule,
  NbCheckboxModule,
  NbButtonModule,
} from '@nebular/theme';
import {NgxLoginComponent} from './login.component';
import {HttpResponse} from '@angular/common/http';

// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbAlertModule,
    NgxAuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '/micro-api/v1/',
          login: {
            endpoint: 'auth/login',
          },
          register: {
            endpoint: 'auth/register',
          },
          token: {
            class: NbAuthSimpleToken,
            key: 'data.token',
            getter: (module: string, res: HttpResponse<Object>,
                     options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
              res.body,
              res.headers.get('Authorization'),
             options.token.key,
           ),
        },
}),
      ],
        forms: {},
      }),
],
  declarations: [NgxLoginComponent],
})

export class NgxAuthModule {
}
