import {environment} from '../../environments/environment';
import {PydrfpermissionsPydrfpermissionsFormService} from 'api/form-service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseNavigationItem} from '@fuse/types';

export class Permissions{

    private urls: any;
    private urlPermissions: any;

    constructor(public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
                public _fuseNavigationService: FuseNavigationService) {

        this.permissionsFormService
            .submit(false, true, true)
            .pipe(
                map(data => {
                    this.urlPermissions = {};
                    for (const i in data){
                        this.urlPermissions[data[i].url + '[' + data[i].action + ']'] = true;
                    }
                    this._fuseNavigationService.reloadPermissions(this.isAllowed, this);
                    if (this.hasPermission('dashboard', 'LIST')){
                        this._fuseNavigationService.reloadBadges();
                    }
                }),
                catchError(errors => {
                    return of({});
                })
            )
            .subscribe();

        this.urls = {};
        this.urls.dashboard = environment.apiUrl + '/dashboard/:id/';

    }

    hasPermission(module, action): boolean {
        if (this.urlPermissions) {
            let url = this.urls[module];
            let method = action;
            if (action === 'LIST' || action === 'POST') {
                url = url.replace(/:([^\/]*)[\/]$/g, '');
                if (action === 'LIST') {
                    method = 'GET';
                }
            }
            url = url.replace(/:([^\/]*)[\/]/g, ':/');

            const urlPermission = url + '[' + method.toLowerCase() + ']';

            /*if (action === 'LIST' && module === 'dashboard'){
                 console.log(module, action, urlPermission, !!this.urlPermissions[urlPermission]);
            }*/
            return !!this.urlPermissions[urlPermission];
        }
        return false;
    }

    isAllowed(nav: FuseNavigationItem, parent): boolean {
        if (nav.permission){
            for (const i in nav.permission){
                const sw = parent.hasPermission(nav.permission[i].module, nav.permission[i].action);
                if (sw !== nav.permission[i].condition){
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

}
