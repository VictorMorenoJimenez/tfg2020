/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { AuthFormModule } from './auth/auth.module';
import { CommentsFormModule } from './comments/comments.module';
import { CoreFormModule } from './core/core.module';
import { DashboardFormModule } from './dashboard/dashboard.module';
import { DestinationsFormModule } from './destinations/destinations.module';
import { PlansFormModule } from './plans/plans.module';
import { PydrfpermissionsFormModule } from './pydrfpermissions/pydrfpermissions.module';
import { TravelersFormModule } from './travelers/travelers.module';
import { TripsFormModule } from './trips/trips.module';
import { UsersFormModule } from './users/users.module';

@NgModule({
  imports: [
    AuthFormModule,
    CommentsFormModule,
    CoreFormModule,
    DashboardFormModule,
    DestinationsFormModule,
    PlansFormModule,
    PydrfpermissionsFormModule,
    TravelersFormModule,
    TripsFormModule,
    UsersFormModule,
  ],
  exports: [
    AuthFormModule,
    CommentsFormModule,
    CoreFormModule,
    DashboardFormModule,
    DestinationsFormModule,
    PlansFormModule,
    PydrfpermissionsFormModule,
    TravelersFormModule,
    TripsFormModule,
    UsersFormModule,
  ],
})
export class ApiFormsModule {}
