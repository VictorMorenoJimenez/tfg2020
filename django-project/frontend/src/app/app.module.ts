import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {ToastrModule} from 'ngx-toastr';
import {ApiFormsModule} from 'api/forms/apiforms.module';
import {AuthModule} from './main/auth/auth.module';
import {RoutesResolver} from './app.routes.resolve';

// Material modules
import {ProjectMaterialModule} from 'app/project-material.module';

import {AppUtilsModule} from './utils/utils.module';

// apps
import {AuthInterceptor} from 'app/utils/auth.interceptor';
import {AuthService} from 'app/utils/auth.service';
import {TranslateResolver} from './utils/translate.resolve';
import {NgxWebstorageModule} from 'ngx-webstorage';

// Locale
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import {HomeModule} from './main/components/home/home.module';
import { ProfileModule } from './main/components/profile/profile.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


registerLocaleData(localeFr);
registerLocaleData(localeEs);
registerLocaleData(localeDe);
registerLocaleData(localeEn);

export function getLanguage(): string {
    if (typeof window !== 'undefined') {
        let l = window.localStorage.getItem('user.language');

        if (l) {
            l = l.replace('"', '');
            l = l.replace('"', '');
        }
        return l || window.navigator.language || 'en';
    }
    return 'en';
}

// Routes
const appRoutes: Routes = [
    {
        path: '',
        resolve: {
            routes: RoutesResolver
        },
        children: []
    },
    {
        path      : '**',
        redirectTo: ''
    }
];

export function createTranslateLoader(http: HttpClient): any {
    return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        ApiFormsModule,
        NgxWebstorageModule.forRoot({prefix: '{{cookiecutter.project_slug}}', separator: '.'}),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

        // Material modules
        ProjectMaterialModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        ToastrModule.forRoot({timeOut: 5000}),

        AppUtilsModule,

        // App modules
        LayoutModule,

        // Custom apps
        AuthModule,
        HomeModule,
        ProfileModule,
    ],
    exports: [],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: getLanguage() },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        TranslateResolver,
        RoutesResolver
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
