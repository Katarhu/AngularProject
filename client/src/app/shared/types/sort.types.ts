export type SortBy = 'name' | 'createdAt';
export type SortType = 'ASC' | 'DESC';

export interface IFilterState {
  filterWord: string;
  sortBy: SortBy;
  sortType: SortType;
}
