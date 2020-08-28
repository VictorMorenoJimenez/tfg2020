/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CoreService} from '../../../controllers/Core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CorePermissionListFormService} from './permissionList.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CoreService,
    CorePermissionListFormService,
  ],
})
export class CorePermissionListModule {}
