import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})

export class StripHtmlPipe implements PipeTransform {
  transform(value: string): any {
    if (value){
      const val = value.replace(/&nbsp;/g, ' '); // replace spaces
      return val.replace(/<.*?>/g, ''); // replace tags
    }
    return value;
  }
}
