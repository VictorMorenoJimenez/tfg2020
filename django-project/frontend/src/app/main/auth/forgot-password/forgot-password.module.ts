import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ForgotPasswordComponent } from 'app/main/auth/forgot-password/forgot-password.component';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateResolver} from '../../../utils/translate.resolve';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

const routes = [
    {
        path     : 'forgot-password',
        component: ForgotPasswordComponent,
        resolve: { translates: TranslateResolver }
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
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
export class ForgotPasswordModule
{
}
