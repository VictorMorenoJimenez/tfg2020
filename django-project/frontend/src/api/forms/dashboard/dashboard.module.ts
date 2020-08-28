/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { DashboardDashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    DashboardDashboardModule,
  ],
  exports: [
    DashboardDashboardModule,
  ],
})
export class DashboardFormModule {}
