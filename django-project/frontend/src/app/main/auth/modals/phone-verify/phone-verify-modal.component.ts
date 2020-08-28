import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {PydrfpermissionsPydrfpermissionsFormService} from '../../../../../api/forms/pydrfpermissions/pydrfpermissions/pydrfpermissions.service';
import {FuseNavigationService} from '../../../../../@fuse/components/navigation/navigation.service';
import {UtilsForm} from '../../../../utils/utilsForm.class';

import {
    AuthUserReadFormService,
    CoreRegisterFormService, CoreVerifyFormService
} from 'api/form-service';
import {catchError, map, takeUntil} from 'rxjs/operators';
import {Utils} from '../../../../utils/utils';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'phone-verify-modal',
    templateUrl: './phone-verify-modal.component.html',
    styleUrls: ['./phone-verify-modal.component.scss']
})

export class PhoneVerifyModalComponent
    extends UtilsForm<CoreRegisterFormService | CoreVerifyFormService>
    implements OnInit {

    user: any;
    sendEmail = false;
    
    constructor(
        public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
        public _fuseNavigationService: FuseNavigationService,
        public matDialogRef: MatDialogRef<PhoneVerifyModalComponent>,
        private snackBar: MatSnackBar,
        private currentUserFormService: AuthUserReadFormService,
        private coreRegisterFormService: CoreRegisterFormService,
        private coreVerifyFormService: CoreVerifyFormService,
        private translateService: TranslateService,
        @Inject(MAT_DIALOG_DATA) public config: any
    ) {
        super(permissionsFormService, _fuseNavigationService);

        if (config){
            this.config = config;
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.formService = this.coreRegisterFormService;

        // Get current user
        this.currentUserFormService.submit(false, true, true).subscribe((res) => {
            this.user = res;
            this.formService.reset({data: {phone_number: this.user.mobile_phone }});
        }, (error) => {
            console.error(error);
        });


        super.ngOnInit();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    cancelEdit($event: MouseEvent): void {
        this.matDialogRef.close();
    }

    /** Send the form to the server
    submit(): void {
        this.matDialogRef.close(this.form.value.data);
    }*/

    /** Send the form to the server */
    register(): void {
        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map((res: any) => {
                    this.formService = this.coreVerifyFormService;
                    this.form = this.formService.form;
                    this.sendEmail = true;
                    this.formService.reset({data: {phone_number: this.user.mobile_phone, session_token: res.session_token}});
                }),
                catchError(errors => {
                    if (!(errors && errors.error && errors.error.non_field_errors)) {
                        this.snackBar.open(
                            this.translateService.instant(`An error occurred while verifying the phone.`),
                            this.translateService.instant(`Close`),
                            {panelClass: 'error'}
                        );
                    }

                    Utils.processServerErrors(
                        this.form.controls.data['controls'],
                        errors.error
                    );
                    return of({});
                })
            )
            .subscribe();
    }

    verify(): void {
        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map(breeder => {
                    this.matDialogRef.close(this.form.value.data);
                    this.finish();
                }),
                catchError(errors => {
                    if (!(errors && errors.error && errors.error.non_field_errors)) {
                        this.snackBar.open(
                            this.translateService.instant(`An error occurred while verifying the phone`),
                            this.translateService.instant(`Close`),
                            {panelClass: 'error'}
                        );
                    }

                    Utils.processServerErrors(
                        this.form.controls.data['controls'],
                        errors.error
                    );
                    return of({});
                })
            )
            .subscribe();
    }

    finish(): void{
        window.location.reload();
    }



}
