import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'highlighttxt' })
export class HighlightTxtPipe implements PipeTransform {
  transform(text: string, arg: string): string {
    var pattern = arg.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    pattern = pattern.split(' ').filter((t) => { return t.length > 0; }).join('|');
    var regex = new RegExp(pattern, 'gi');

    return arg ? text.replace(regex, (match) => `<font color="blue"><b>${match}</b></font>`) : text;
  }
}
