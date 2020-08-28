import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthResetFormService} from 'api/form-service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} router
     * @param {AuthResetFormService} formService
     * @param {MatSnackBar} snackBar
     * @param {TranslateService} translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        public formService: AuthResetFormService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            public: true,
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
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
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     * Recovery
     */
    recovery(): void {
        this.formService.form.value.data = this.forgotPasswordForm.value;
        this.formService.submit().subscribe((res) => {
            this.router.navigate(['/login']);
            this.snackBar.open(
                this.translateService.instant(`Instructions have been sent to change the password to your email.`),
                this.translateService.instant(`Close`)
            );
        //
        }, (error) => {
            if (error && error.error && error.error.email){
                this.snackBar.open(
                    error.error.email,
                    this.translateService.instant(`Close`),
                    {panelClass: 'error'}
                );
            }
        });
    }
}
