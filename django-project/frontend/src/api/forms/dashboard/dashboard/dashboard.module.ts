/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DashboardService} from '../../../controllers/Dashboard';
import {FormsSharedModule} from '../../forms-shared.module';
import {DashboardDashboardFormService} from './dashboard.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DashboardService,
    DashboardDashboardFormService,
  ],
})
export class DashboardDashboardModule {}
