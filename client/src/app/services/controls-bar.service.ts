import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FilterBy, IFilterState, SortBy, SortType} from "../shared/types/sort.types";


const defaultState: IFilterState = {
  filterWord: '',
  filterBy: 'board',
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

  set filterBy(filterBy: FilterBy) {
    this.filterState$.next({
      ...this.filterState$.value, filterBy
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

  get filterBy() {
    return this.filterState$.value.filterBy;
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
