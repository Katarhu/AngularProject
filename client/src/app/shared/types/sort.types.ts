export type SortBy = 'name' | 'createdAt';
export type SortType = 'ASC' | 'DESC';
export type FilterBy = FilterTypes.name | FilterTypes.tasks | FilterTypes.description;

export interface IFilterState {
  filterWord: string;
  filterBy: FilterBy;
  sortBy: SortBy;
  sortType: SortType;
}

export enum FilterTypes {
  name = 'name',
  tasks = 'tasks',
  description = 'description'
}

