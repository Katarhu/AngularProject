import {Pipe, PipeTransform} from '@angular/core';
import {IBoard} from "../models/board.model";
import {FilterBy, FilterTypes} from "../types/sort.types";
import {select, Store} from "@ngrx/store";
import {IAppStore} from "../../store/app.store";
import {filterTasksByFilter} from "../../store/tasks/tasks.selectors";
import {map, mergeMap, Observable} from "rxjs";

@Pipe({
  name: 'filterBoard'
})
export class FilterBoardPipe implements PipeTransform {

  constructor(
    private store: Store<IAppStore>
  ) {
  }

  getFilteredTasksBoardIds = (filterWord: string): Observable<string[]> => {
    return this.store.pipe(select(filterTasksByFilter(filterWord)));
  }

  transform(boards: Observable<IBoard[]>, filter: string, filterBy: FilterBy): Observable<IBoard[]> {

    switch (filterBy) {
      case FilterTypes.tasks:

        return boards.pipe(
          mergeMap((boards) =>
            this.getFilteredTasksBoardIds(filter)
              .pipe(
                map((taskIds) => boards.filter((board) => taskIds.includes(board._id))),
              )
          )
        )

      case FilterTypes.description:
        return boards.pipe(
          map((boards) =>
            boards.filter((board) => board.description.trim().toLowerCase().startsWith(filter.toLowerCase()))
          )
        )
      case FilterTypes.name:
        return boards.pipe(
          map((boards) =>
            boards.filter((board) => board.name.trim().toLowerCase().startsWith(filter.toLowerCase()))
          )
        )
      default:
        return boards
    }

  }
}
