import { Pipe, PipeTransform } from '@angular/core';
import {SortBy} from "../types/sort.types";

enum SortTypes {
  ASC='ASC',
  DESC='DESC'
}


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform<T extends { name: string; createdAt: string }>(value: T[] | null, sortBy: SortBy = 'name', sortType: string = SortTypes.ASC): T[] {
    if( value == null ) return [];

    switch (sortType) {
      case SortTypes.ASC:
        return value.sort((firstObj, secondObj) => firstObj[sortBy] > secondObj[sortBy] ? 1 : -1);
      case SortTypes.DESC:
        return value.sort((firstObj, secondObj) => firstObj[sortBy] > secondObj[sortBy] ? -1 : 1);
      default:
        return value
    }
  }

}
