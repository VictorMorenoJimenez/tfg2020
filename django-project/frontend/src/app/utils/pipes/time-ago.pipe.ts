import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {TranslateWithoutExtractPipe} from './translate-without-extract.pipe';
@Pipe({
    name: 'timeAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private timer: number;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
        private translateService: TranslateService,
        private translateWithoutExtractPipe: TranslateWithoutExtractPipe) { }

    transform(value: string): any {
        this.removeTimer();
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });
        const minutes = Math.round(Math.abs(seconds / 60));
        const hours = Math.round(Math.abs(minutes / 60));
        const days = Math.round(Math.abs(hours / 24));
        const months = Math.round(Math.abs(days / 30.416));
        const years = Math.round(Math.abs(days / 365));
        if (Number.isNaN(seconds)) {
            return '';
        } else if (seconds <= 45) {
            return this.translateService.instant('a few seconds ago');
        } else if (seconds <= 90) {
            return this.translateService.instant('a minute ago');
        } else if (minutes <= 45) {
            return this.translateWithoutExtractPipe.transform(
                this.translateService.instant('{{time}} minutes ago'),
                {time: minutes}
            );
        } else if (minutes <= 90) {
            return this.translateService.instant('an hour ago');
        } else if (hours <= 22) {
            return this.translateWithoutExtractPipe.transform(
                this.translateService.instant('{{time}} hours ago'),
                {time: hours}
                );
        } else if (hours <= 36) {
            return this.translateService.instant('a day ago');
        } else if (days <= 25) {
            return this.translateWithoutExtractPipe.transform(
                this.translateService.instant('{{time}} days ago'),
                {time: days}
            );
        } else if (days <= 45) {
            return this.translateService.instant('a month ago');
        } else if (days <= 345) {
            return this.translateWithoutExtractPipe.transform(
                this.translateService.instant('{{time}} months ago'),
                {time: months}
            );
        } else if (days <= 545) {
            return this.translateService.instant('a year ago');
        } else { // (days > 545)
            return this.translateWithoutExtractPipe.transform(
                this.translateService.instant('{{time}} years ago'),
                {time: years}
            );
        }
    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer(): void {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    private getSecondsUntilUpdate(seconds: number): number {
        const min = 60;
        const hr = min * 60;
        const day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
