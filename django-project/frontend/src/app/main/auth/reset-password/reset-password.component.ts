import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {
    AuthConfirmFormService,
    PydrfpermissionsPydrfpermissionsFormService
} from 'api/form-service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utils} from '../../../utils/utils';
import {UtilsForm} from '../../../utils/utilsForm.class';
import {FuseNavigationService} from '../../../../@fuse/components/navigation/navigation.service';

@Component({
    selector     : 'reset-password',
    templateUrl  : './reset-password.component.html',
    styleUrls    : ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPasswordComponent extends UtilsForm<AuthConfirmFormService> implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;
    serverErrors: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
        public _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formService: AuthConfirmFormService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    )
    {
        super(permissionsFormService, _fuseNavigationService);
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
        // Get token and uid
        this.route.params.subscribe(params => {
            this.formService.reset({data: params});
        });
        super.ngOnInit();
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

    /**
     * Reset password
     */
    reset(): void {
        this.formService.submit().subscribe((res) => {
            this.router.navigate(['/login']);

            this.snackBar.open(
                this.translateService.instant(`The password has been changed successfully..`),
                this.translateService.instant(`Close`)
            );
        }, (error) => {
            Utils.processServerErrors(
                this.form.controls.data['controls'],
                error.error
            );
            if (error && error.error && error.error.password){
                this.snackBar.open(
                    error.error.password,
                    this.translateService.instant(`Close`),
                    {panelClass: 'error'}
                );
            }
        });
    }
}
