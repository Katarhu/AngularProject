import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaskService} from "../../features/board-page/services/task.service";
import * as TaskActions from './tasks.actions';
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()
export class TasksEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTasks),
      mergeMap(() =>
        this.taskService.init()
          .pipe(
            map((tasks) =>
              TaskActions.getTasksSuccess({tasks})
            ),
            catchError((err) =>
              of(TaskActions.getTasksFailure({message: err}))
            )
          )
      )
    )
  )
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap((action) =>
        this.taskService.createTask(action)
          .pipe(
            map((task) => TaskActions.createTaskSuccess({task})),
            catchError((err) => of(
              TaskActions.createTaskFailure({message: err})
            ))
          )
      )
    )
  )
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action)
          .pipe(
            map(() => TaskActions.deleteTaskSuccess(action)),
            catchError((err) => of(
              TaskActions.deleteTaskFailure({message: err})
            ))
          )
      )
    )
  )
  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap((action) =>
        this.taskService.editTask(action)
          .pipe(
            map(() => TaskActions.editTaskSuccess(action)),
            catchError((err) => of(
              TaskActions.editTaskFailure({message: err})
            ))
          )
      )
    )
  )
  changeTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.changeTaskList),
      mergeMap((action) =>
        this.taskService.changeTaskList(action)
          .pipe(
            map(() => TaskActions.changeTaskListSuccess(action)),
            catchError((err) => of(
              TaskActions.changeTaskListFailure({message: err})
            ))
          )
      )
    )
  )
  archiveTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.archiveTask),
      mergeMap((action) =>
        this.taskService.archiveTask(action)
          .pipe(
            map(() => TaskActions.archiveTaskSuccess(action)),
            catchError((err) => of(
              TaskActions.archiveTaskFailure({message: err})
            ))
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {
  }
}
