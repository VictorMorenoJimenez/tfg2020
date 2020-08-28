import { DisableControlDirective } from './directives/disable-control.directive.spec';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectMaterialModule } from '../project-material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { RouterModule } from '@angular/router';

// Pipes
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AltDatePipe } from './pipes/alt-date.pipe';
import { StripHtmlPipe } from './pipes/strip-html';
import { TranslateWithoutExtractPipe } from './pipes/translate-without-extract.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { SplitPipe } from './pipes/split';

// Translate
import { TranslateInputComponent } from './components/translate-input/translate-input.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { RouteTransformerDirective } from './directives/route-transformer.directive';
import { ngfModule } from 'angular-file';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HighlightSearch } from './pipes/highlight-search.pipe';
import { QuillModule } from 'ngx-quill';
import { GooglePlacesModule } from './components/google-place/google-place.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [
        RouteTransformerDirective,
        DisableControlDirective,
        CurrencySymbolPipe,
        AltDatePipe,
        SafeHtmlPipe,
        StripHtmlPipe,
        HighlightSearch,
        SplitPipe,
        TranslateWithoutExtractPipe,
        TimeAgoPipe,

        // translate
        TranslateInputComponent,

        // utils
        InfiniteScrollComponent,
        PhoneInputComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectMaterialModule,
        FuseSharedModule,
        PickerModule,
        ngfModule,
        QuillModule.forRoot({
            modules: {
                toolbar: [
                    ['bold', 'italic'], // toggled buttons
                    [{ 'header': 1 }, { 'header': 2 }], // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['clean'], // remove formatting button
                ]
            }
        }),

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

        // utils
        NgxIntlTelInputModule,
        GooglePlacesModule,
        GoogleMapsModule
    ],
    exports: [
        RouteTransformerDirective,
        DisableControlDirective,
        CurrencySymbolPipe,
        AltDatePipe,
        SafeHtmlPipe,
        StripHtmlPipe,
        HighlightSearch,
        SplitPipe,
        TranslateWithoutExtractPipe,
        TimeAgoPipe,
        PhoneInputComponent,

        // translate
        TranslateInputComponent,

        // utils
        InfiniteScrollComponent,
        ngfModule,
        GooglePlacesModule,
        GoogleMapsModule,
    ],
    providers: [
        CurrencySymbolPipe,
        StripHtmlPipe,
        HighlightSearch,
        TranslateWithoutExtractPipe,
        LocalStorageService,
        SessionStorageService
    ]
})

export class AppUtilsModule {
}
