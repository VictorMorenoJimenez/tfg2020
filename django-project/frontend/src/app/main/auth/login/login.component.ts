import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject} from 'rxjs';

import {
    AuthLoginFormService
} from 'api/form-service';

import { AuthService } from 'app/utils/auth.service';
import { AppStorageService } from 'app/utils/app-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit, AfterViewInit
{

    loginForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public formService: AuthLoginFormService,
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private appStorageService: AppStorageService,
    ) {
        this._unsubscribeAll = new Subject();
        // Configure the layout
        this._fuseConfigService.config = {
            public: true,
            layout: {
                navbar : {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer : {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.route.url.subscribe(url => {

                if (url[0].path === 'account-confirm-email-error'){
                    this.snackBar.open(
                        this.translateService.instant(`An error occurred while activating the user.`),
                        this.translateService.instant(`Close`),
                        {panelClass: 'error'}
                    );
                }

                if (url[0].path === 'account-confirm-email-success'){
                    this.snackBar.open(
                        this.translateService.instant(`Successfully activated. Enter your username and password to log in to the system`),
                        this.translateService.instant(`Close`),
                        {duration: 6000}
                    );
                }

            });
        });
    }

    /**
     * Login
     */
    login(): void {
        this.appStorageService.clear();
        this.formService.form.value.data = this.loginForm.value;
        this.formService.submit().subscribe((res) => {
            this.auth.setToken(res['key']);
            window.location.href = '/';
        }, (error) => {
            console.error(error);
        });
    }
}
