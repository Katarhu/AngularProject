import {Injectable} from "@angular/core";
import {ListService} from "../../features/board-page/services/list.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as ListActions from './lists.actions';
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()
export class ListsEffects {
  getLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.getLists),
      mergeMap((action) =>
        this.listsService.init(action.boardId)
          .pipe(
            map((lists) =>
              ListActions.getListsSuccess({lists})
            ),
            catchError((err) =>
              of(ListActions.getListsFailure({message: err}))
            )
          )
      )
    )
  )
  changeListColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.changeListColor),
      mergeMap((action) =>
        this.listsService.changeListColor(action)
          .pipe(
            map(() => ListActions.changeListColorSuccess(action)),
            catchError((err) => of(
              ListActions.changeListColorFailure({message: err})
            ))
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private listsService: ListService,
  ) {
  }
}
