import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import {ActivatedRoute, Router} from '@angular/router';

import { navigation } from 'app/navigation/navigation';
import {
    AuthLogoutCreateFormService, AuthUserReadFormService, UsersPartialUpdateFormService
} from 'api/form-service';
import {AppStorageService} from 'app/utils/app-storage.service';
import {CommonOptionsService} from 'app/utils/commonOptions.service';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from 'app/utils/auth.service';
import { ChangePasswordComponent } from '../../../main/auth/modals/change-password/change-password.component';


@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    user: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    impersonate: boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private formService: AuthUserReadFormService,
        private usersPartialUpdateFormService: UsersPartialUpdateFormService,
        private usersLogoutFormService: AuthLogoutCreateFormService,
        private appStorageService: AppStorageService,
        private authService: AuthService,
        private router: Router,
        private commonOptionsService: CommonOptionsService,
        public dialog: MatDialog
    )
    {
        this.languages = commonOptionsService.getLanguageOptions();

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.impersonate = !!this.authService.getTokenImpersonate();

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});

        // Get current user
        this.formService.submit(false, true, true).subscribe((res) => {
            setTimeout(() => {
                this.user = res;
                // languages
                // this.selectedLanguage = _.find(this.languages, {'id': this.user.language});
                // this.appStorageService.set('language', this.user.language);
                // this._translateService.use(this.user.language);

                // aditional validations
                // if (!this.user.is_verified && this.user.user_type !== 'undefined' && this.user.user_type !== 'admin'){
                //     this.dialog.open(PhoneVerifyModalComponent);
                // }
            }, 1000);

        }, (error) => {
            console.error(error);
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;
        this.appStorageService.set('language', lang.id);

        // Use the selected language for translations
        this._translateService.use(lang.id);

        this.usersPartialUpdateFormService.submit({id: this.user.id, data: {language: lang.id}})
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                window.location.href = '/';
            });

    }

    /**
     * Returns an Observable with the product
     */
    logout(): void {
        this.usersLogoutFormService.submit().subscribe((res) => {
            this.appStorageService.clear();
            window.location.href = '/login';
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * endImpersonate Function
     */
    endImpersonate(): void {
        this.authService.setToken(this.authService.getTokenImpersonate());
        this.authService.setTokenImpersonate('');

        window.location.href = '/login';
    }

    changePassword(): void {
        this.dialog.open(ChangePasswordComponent);
    }

}
