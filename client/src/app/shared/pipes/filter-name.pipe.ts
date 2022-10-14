import { Pipe, PipeTransform } from '@angular/core';
import {IBoard} from "../types/board.types";

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform<T extends { name: string }>(value: T[] | null  = [] , filterWord: string = ''): T[]  {
    if( value === null ) return [];

    if( filterWord ) {
      return value.filter((value) =>  value.name.trim().toLowerCase().startsWith(filterWord.toLowerCase()))
    }

    return value;
  }
}
