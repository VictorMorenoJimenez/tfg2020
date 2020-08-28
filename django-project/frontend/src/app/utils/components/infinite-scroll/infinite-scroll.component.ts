import {Component, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import $ from 'jquery';

@Component({
    selector: 'infinite-scroll',
    template: ''
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {

    @Output()
    action = new EventEmitter<void>();

    constructor() { }

    ngAfterViewInit(): void {
        setTimeout(() => {
            document.getElementById('container-3').addEventListener('scroll', this.scrollEvent, true);
        });
    }

    ngOnDestroy(): void {
        document.getElementById('container-3').removeEventListener('scroll', this.scrollEvent, true);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    scrollEvent = ($event: any): void => {
        const scrollOffset = $event.srcElement.scrollHeight - $event.srcElement.scrollTop - $('#container-3').height();
        if (scrollOffset < $('footer').height()){
            this.action.emit();
        }
    }

}
