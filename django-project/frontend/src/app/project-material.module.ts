import {Injectable, NgModule} from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
    MatChipsModule,
    MAT_CHIPS_DEFAULT_OPTIONS
} from '@angular/material/chips';

// 3rd Material components
import {NgSelectModule} from '@ng-select/ng-select';
import {getCatPaginatorIntl} from './utils/cat-paginator-intl';
import {OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {TranslateService} from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


// here is the default text string
@Injectable()
export class DefaultIntl extends OwlDateTimeIntl {

    constructor(
        private translateService: TranslateService
    ) {
        super();
    }

    /** A label for the up second button (used by screen readers).  */
    get upSecondLabel(): string{ return this.translateService.instant('Add a second'); }
    set upSecondLabel(value){}

    /** A label for the down second button (used by screen readers).  */
    get downSecondLabel(): string{ return this.translateService.instant('Minus a second'); }
    set downSecondLabel(value){}

    /** A label for the up minute button (used by screen readers).  */
    get upMinuteLabel(){ return this.translateService.instant('Add a minute'); }
    set upMinuteLabel(value){}

    /** A label for the down minute button (used by screen readers).  */
    get downMinuteLabel(): string{ return this.translateService.instant('Minus a minute'); }
    set downMinuteLabel(value){}

    /** A label for the up hour button (used by screen readers).  */
    get upHourLabel(): string{ return this.translateService.instant('Add a hour'); }
    set upHourLabel(value){}

    /** A label for the down hour button (used by screen readers).  */
    get downHourLabel(): string{ return this.translateService.instant('Minus a hour'); }
    set downHourLabel(value){}

    /** A label for the previous month button (used by screen readers). */
    get prevMonthLabel(): string{ return this.translateService.instant('Previous month'); }
    set prevMonthLabel(value){}

    /** A label for the next month button (used by screen readers). */
    get nextMonthLabel(): string{ return this.translateService.instant('Next month'); }
    set nextMonthLabel(value){}

    /** A label for the previous year button (used by screen readers). */
    get prevYearLabel(): string{ return this.translateService.instant('Previous year'); }
    set prevYearLabel(value){}

    /** A label for the next year button (used by screen readers). */
    get nextYearLabel(): string{ return this.translateService.instant('Next year'); }
    set nextYearLabel(value){}

    /** A label for the previous multi-year button (used by screen readers). */
    get prevMultiYearLabel(): string{ return this.translateService.instant('Previous 21 years'); }
    set prevMultiYearLabel(value){}

    /** A label for the next multi-year button (used by screen readers). */
    get nextMultiYearLabel(): string{ return this.translateService.instant('Next 21 years'); }
    set nextMultiYearLabel(value){}

    /** A label for the 'switch to month view' button (used by screen readers). */
    get switchToMonthViewLabel(): string{ return this.translateService.instant('Change to month view'); }
    set switchToMonthViewLabel(value){}

    /** A label for the 'switch to year view' button (used by screen readers). */
    get switchToMultiYearViewLabel(): string{ return this.translateService.instant('Choose month and year'); }
    set switchToMultiYearViewLabel(value){}

    /** A label for the cancel button */
    get cancelBtnLabel(): string{ return this.translateService.instant('Cancel'); }
    set cancelBtnLabel(value){}

    /** A label for the set button */
    get setBtnLabel(): string{ return this.translateService.instant('Set'); }
    set setBtnLabel(value){}

    /** A label for the range 'from' in picker info */
    get rangeFromLabel(): string{ return this.translateService.instant('From'); }
    set rangeFromLabel(value){}

    /** A label for the range 'to' in picker info */
    get rangeToLabel(): string{ return this.translateService.instant('To'); }
    set rangeToLabel(value){}

    /** A label for the hour12 button (AM) */
    get hour12AMLabel(): string{ return this.translateService.instant('AM'); }
    set hour12AMLabel(value){}

    /** A label for the hour12 button (PM) */
    get hour12PMLabel(): string{ return this.translateService.instant('PM'); }
    set hour12PMLabel(value){}
}

@Injectable()
export class DefaultSelectString {

    constructor(
        private translateService: TranslateService
    ) {
    }
    get placeholder(): string{ return this.translateService.instant('Select item'); }
    set placeholder(value){}

    get notFoundText(): string{ return this.translateService.instant('There are no items'); }
    set notFoundText(value){}

    get addTagText(): string{ return this.translateService.instant('Add element'); }
    set addTagText(value){}

    get typeToSearchText(): string{ return this.translateService.instant('Search for...'); }
    set typeToSearchText(value){}

    get loadingText(): string{ return this.translateService.instant('Loading...'); }
    set loadingText(value){}

    get clearAllText(): string{ return this.translateService.instant('Erase'); }
    set clearAllText(value){}
}


@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatTabsModule,
        MatTreeModule,
        MatStepperModule,
        MatExpansionModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatRadioModule,
        MatSliderModule,
        MatButtonToggleModule,

        // 3rd Party Modules
        NgSelectModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatTabsModule,
        MatTreeModule,
        MatStepperModule,
        MatExpansionModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatRadioModule,
        MatSliderModule,
        MatButtonToggleModule,

        // 3rd Party Modules
        NgSelectModule
    ],
    providers: [
        // {provide: NG_SELECT_DEFAULT_CONFIG, useClass: DefaultSelectString},
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}},
        {provide: MatPaginatorIntl, useValue: getCatPaginatorIntl()},
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA]
            }
        },
        {provide: MAT_DATE_LOCALE, useValue: 'en-en'},
        {provide: OwlDateTimeIntl, useClass: DefaultIntl},
    ]
})
export class ProjectMaterialModule {
}



