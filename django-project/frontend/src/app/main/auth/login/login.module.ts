import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import {TranslateResolver} from '../../../utils/translate.resolve';

const routes = [
    {
        path     : 'login',
        component: LoginComponent,
        resolve: { translates: TranslateResolver }
    },
    {
        path     : 'account-confirm-email-error',
        component: LoginComponent,
        resolve: { translates: TranslateResolver }
    },
    {
        path     : 'account-confirm-email-success',
        component: LoginComponent,
        resolve: { translates: TranslateResolver }
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,

        FuseSharedModule
    ],
    providers: [
        TranslateResolver
    ]
})
export class LoginModule
{
}
