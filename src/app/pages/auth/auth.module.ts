import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbAuthModule} from '@nebular/auth';
import {NgxAuthRoutingModule} from './auth-routing.module';

import {
  NbAlertModule,
  NbInputModule,
  NbCheckboxModule,
  NbButtonModule,
} from '@nebular/theme';
import {NgxLoginComponent} from './login.component';

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
    NbAuthModule,
  ],
  declarations: [NgxLoginComponent],
})

export class NgxAuthModule {
}
