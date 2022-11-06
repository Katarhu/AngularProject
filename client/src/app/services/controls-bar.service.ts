import {Injectable} from '@angular/core';
import {FilterBy, FilterTypes, IFilterState, SortBy, SortType} from "../shared/types/sort.types";


const defaultState: IFilterState = {
  filterWord: '',
  filterBy: FilterTypes.name,
  sortBy: 'name',
  sortType: 'ASC',
}

@Injectable({
  providedIn: 'root'
})
export class ControlsBarService {

  filterState = defaultState;


  constructor() {
  }

  get filterWord() {
    return this.filterState.filterWord
  }

  get filterBy() {
    return this.filterState.filterBy
  }

  get sortBy() {
    return this.filterState.sortBy
  }

  get sortType() {
    return this.filterState.sortType
  }

  setFilterWord = (filterWord: string) => this.filterState = {...this.filterState, filterWord}

  setFilterBy = (filterBy: FilterBy) => this.filterState = {...this.filterState, filterBy}

  setSortBy = (sortBy: SortBy) => this.filterState = {...this.filterState, sortBy}

  setSortType = (sortType: SortType) => this.filterState = {...this.filterState, sortType}

  clear() {
    this.filterState = defaultState;
  }
}
