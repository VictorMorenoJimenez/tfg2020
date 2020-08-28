import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'altDate'})
export class AltDatePipe implements PipeTransform {
    transform(value: any): any {
        // @ts-ignore
        var diff = Date.now() - new Date(value);

        /**
         * If in a hour
         * e.g. "2 minutes ago"
         */
        if (diff < (60 * 60 * 1000)) {
            return moment(value).fromNow();
        }
        /*
         * If in the day
         * e.g. "11:23"
         */
        else if (diff < (60 * 60 * 24 * 1000)) {
            return moment(value).format('HH:mm');
        }
        /*
         * If in week
         * e.g "Tuesday 11:23"
         */
        else if (diff < (60 * 60 * 24 * 7 * 1000)) {
            return moment(value).format('dddd HH:mm');
        }
        /*
         * If more than a week
         * e.g. "29/03/2016 11:23"
         */
        else {
            return moment(value).format('DD/MM/YYYY HH:mm');
        }
    }
}
