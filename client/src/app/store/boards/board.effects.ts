import {BoardService} from "../../features/dashboard/services/board.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {catchError, exhaustMap, map, merge, mergeMap, of, switchMap} from "rxjs";
import * as BoardActions from './board.actions';
import * as ListActions from '../lists/lists.actions';
import * as TaskActions from '../tasks/tasks.actions';
import {Injectable} from "@angular/core";

@Injectable()
export class BoardEffects {

  constructor(
    private actions$: Actions,
    private boardService: BoardService
  ) {
  }

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() => {
        return this.boardService.init()
          .pipe(
            map((boards) => {
              return BoardActions.getBoardsSuccess({ boards })
            }),
            catchError((err) =>
              of(BoardActions.getBoardsFailure({message: err }))
            )
          )
      })
    )
  )

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      exhaustMap(action =>
        this.boardService.createBoard(action)
          .pipe(
            switchMap((board) => of(
              BoardActions.addBoardSuccess({ board }),
              ListActions.getLists({ boardId: board._id })
            )),
            catchError((err) =>
              of(BoardActions.addBoardFailure({ message: err }))
            )
          )
      )
    )
  )

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap((action) =>
        this.boardService.deleteBoard(action)
          .pipe(
            switchMap(() => of(
              BoardActions.deleteBoardSuccess(action),
              ListActions.deleteListsByBoard(action),
              TaskActions.deleteTaskByBoard(action)
            )),
            catchError((err) => of(
              BoardActions.deleteBoardFailure({ message: err })
            ))
          )
      )
    )
  )

  changeBoardName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.editBoard),
      mergeMap((action) =>
        this.boardService.updateBoardName(action)
          .pipe(
            map(() =>
              BoardActions.editBoardSuccess(action)
            ),
            catchError((err) => of(
              BoardActions.editBoardFailure({ message: err })
            ))
          )
      )
    )
  )
}
