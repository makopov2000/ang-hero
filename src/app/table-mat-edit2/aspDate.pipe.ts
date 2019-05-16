import {Pipe, PipeTransform} from '@angular/core'
import {SlicePipe, DatePipe} from '@angular/common'

@Pipe({name: 'AspDate'})
export class AspDatePipe implements PipeTransform {
    constructor(private dPipe:DatePipe){};
    transform(value: string, arg: string):string {
        let slicedValue = new SlicePipe().transform(value, 6, -2);
        return this.dPipe.transform(slicedValue, arg);
    }
}
