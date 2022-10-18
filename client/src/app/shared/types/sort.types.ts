export type SortBy = 'name' | 'createdAt';
export type SortType = 'ASC' | 'DESC';
export type FilterBy = 'board' | 'task'

export interface IFilterState {
  filterWord: string;
  filterBy: FilterBy;
  sortBy: SortBy;
  sortType: SortType;
}
