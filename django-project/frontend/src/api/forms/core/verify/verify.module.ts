/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CoreService} from '../../../controllers/Core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CoreVerifyFormService} from './verify.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CoreService,
    CoreVerifyFormService,
  ],
})
export class CoreVerifyModule {}
