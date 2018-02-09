import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyActive'
})
export class OnlyActivePipe implements PipeTransform {

  transform(doc: any, args?: any): any {
    return doc.isActive?doc.isActive:true;
  }

}
