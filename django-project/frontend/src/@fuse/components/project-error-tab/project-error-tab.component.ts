import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-project-error-tab',
    templateUrl: './project-error-tab.component.html',
    styleUrls: ['./project-error-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectErrorTabComponent {

    @Input() label: string;
    @Input() serverErrors: any;
    @Input() controls: string[];

    constructor() {
    }

    hasError(controls=this.controls): boolean {
        for(let i in controls){
            let control=controls[i].split('.');
            if(this.serverErrors &&
                this.serverErrors[control[0]]){
                if(this.serverErrors[control[0]].length>0){
                    return true;
                }
                if(control[1] && this.serverErrors[control[0]][control[1]] && this.serverErrors[control[0]][control[1]].length>0){
                    return true;
                }
            }

        }
        return false;
    }
}
