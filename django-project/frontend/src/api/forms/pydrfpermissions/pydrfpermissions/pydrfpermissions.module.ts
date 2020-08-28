/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PydrfpermissionsService} from '../../../controllers/Pydrfpermissions';
import {FormsSharedModule} from '../../forms-shared.module';
import {PydrfpermissionsPydrfpermissionsFormService} from './pydrfpermissions.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PydrfpermissionsService,
    PydrfpermissionsPydrfpermissionsFormService,
  ],
})
export class PydrfpermissionsPydrfpermissionsModule {}
