/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CoreService} from '../../../controllers/Core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CoreRegisterFormService} from './register.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CoreService,
    CoreRegisterFormService,
  ],
})
export class CoreRegisterModule {}
