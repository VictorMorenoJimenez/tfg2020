/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { CoreContentTypeListModule } from './contentTypeList/contentTypeList.module';
import { CoreContentTypeReadModule } from './contentTypeRead/contentTypeRead.module';
import { CorePermissionListModule } from './permissionList/permissionList.module';
import { CoreSendErrorModule } from './sendError/sendError.module';
import { CorePermissionReadModule } from './permissionRead/permissionRead.module';
import { CoreRegisterModule } from './register/register.module';
import { CoreVerifyModule } from './verify/verify.module';

@NgModule({
  imports: [
    CoreContentTypeListModule,
    CoreContentTypeReadModule,
    CorePermissionListModule,
    CoreSendErrorModule,
    CorePermissionReadModule,
    CoreRegisterModule,
    CoreVerifyModule,
  ],
  exports: [
    CoreContentTypeListModule,
    CoreContentTypeReadModule,
    CorePermissionListModule,
    CoreSendErrorModule,
    CorePermissionReadModule,
    CoreRegisterModule,
    CoreVerifyModule,
  ],
})
export class CoreFormModule {}
