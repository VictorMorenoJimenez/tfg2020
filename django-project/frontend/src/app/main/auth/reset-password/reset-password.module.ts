import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetPasswordComponent } from 'app/main/auth/reset-password/reset-password.component';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateResolver} from '../../../utils/translate.resolve';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

const routes = [
    {
        path     : 'reset-password/:uid/:token',
        component: ResetPasswordComponent,
        resolve: { translates: TranslateResolver }
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    providers: [
        TranslateResolver
    ]
})
export class ResetPasswordModule
{
}
