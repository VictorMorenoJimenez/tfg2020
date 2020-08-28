import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-project-error',
    templateUrl: './project-error.component.html',
    styleUrls: ['./project-error.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectErrorComponent {

    @Input() control: AbstractControl;
    @Input() serverErrors: string[];

    constructor() {
    }

}
