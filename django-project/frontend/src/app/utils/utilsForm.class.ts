import { OnInit, Input, OnDestroy, Directive } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {takeUntil, map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Permissions} from './permissions.class';
import {PydrfpermissionsPydrfpermissionsFormService} from 'api/form-service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';

export interface FormService {
    form: FormGroup;
    defaultValue: any;
    serverErrors$: Observable<any>;
    loading$: Observable<boolean>;
}

@Directive()
export class UtilsForm<FS extends FormService> extends Permissions implements OnInit, OnDestroy {
    @Input()
    formService: FS;

    form: FormGroup;
    serverErrors: any;
    protected unsubscribe$: Subject<void> = new Subject();

    constructor(public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
                public _fuseNavigationService: FuseNavigationService) {
        super(permissionsFormService, _fuseNavigationService);
    }

    ngOnInit(): void {
        this.form = this.formService.form;

        // Subscribe to server errors
        this.formService.serverErrors$
            .pipe(
                takeUntil(this.unsubscribe$),
                map(errors => (this.serverErrors = errors))
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    clearData(obj): any {
        for (let i in obj){
            // @ts-ignore
            if (i.indexOf('_data') !== -1){
                if (!obj[i]){
                    delete obj[i];
                }
            }
        }
        return obj;
    }
}
