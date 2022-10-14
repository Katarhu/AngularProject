import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IFilterState, SortBy, SortType} from "../shared/types/sort.types";


const defaultState: IFilterState = {
  filterWord: '',
  sortBy: 'name',
  sortType: 'ASC',
}

@Injectable({
  providedIn: 'root'
})
export class ControlsBarService {

  private filterState$ = new BehaviorSubject(defaultState);


  constructor() { }

  set filterWord(filterWord: string) {
    this.filterState$.next({
      ...this.filterState$.value, filterWord
    })
  }

  set sortBy( sortBy: SortBy ) {
    this.filterState$.next({
      ...this.filterState$.value, sortBy
    })
  }

  set sortType( sortType: SortType ) {
    this.filterState$.next({
      ...this.filterState$.value, sortType
    })
  }

  get filterWord() {
    return this.filterState$.value.filterWord;
  }

  get sortBy() {
    return this.filterState$.value.sortBy;
  }

  get sortType() {
    return this.filterState$.value.sortType;
  }

  clear() {
    this.filterState$.next(defaultState);
  }
}
