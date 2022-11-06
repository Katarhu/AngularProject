import { Pipe, PipeTransform } from '@angular/core';

interface x {
  name?: string;
  description?: string;
}

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform<T extends x>(value: T[] | null  = [] , filterWord: string = ''): T[]  {
    if( value === null ) return [];

    if( filterWord ) {
      return value.filter((value) =>  value.name?.trim().toLowerCase().startsWith(filterWord.toLowerCase()))
    }

    return value;
  }
}
