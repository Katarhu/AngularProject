import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, tap} from "rxjs";
import { ICreateTask, ITask } from "../../../shared/types/tasks.types";
import {DragNDropService} from "../../../services/drag-n-drop.service";
import {BoardService} from "../../dashboard/services/board.service";
import {ErrorService} from "../../../services/error.service";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks$ = new BehaviorSubject<ITask[]>([]);

  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private dndService: DragNDropService,
    private errorService: ErrorService
  ) { }


  init(boardId: string) {
    if( this.tasks$.value.length ) return;
    this.http.get<ITask[]>(`tasks?boardId=${boardId}`)
      .pipe(
        tap((tasks) => {
          this.tasks$.next(tasks);
        })
      )
      .subscribe();
  }

  getTasks(listId: string) {
    return this.tasks$
      .pipe(
        map((value) => value.filter((task) => task.listId === listId))
      );
  }

  getTasksByBoard(boardId: string) {
    return this.tasks$.pipe(
      map((value) => value.filter((task) => task.boardId === boardId))
    )
  }

  createTask(task: ICreateTask) {
    this.http.post<ITask>('tasks', task)
      .subscribe((createdTask) => {
        this.boardService.addBoardTask(createdTask.boardId, createdTask.listId, createdTask._id);
        this.tasks$.next(
          [...this.tasks$.value, createdTask]
        )
      })
  }

  deleteTask(_id: string) {
    this.http.delete(`tasks/${_id}`)
      .subscribe(() => {
        const taskToDelete = this.tasks$.value.find((task) => task._id === _id);
        this.boardService.deleteBoardTask(taskToDelete!.boardId, taskToDelete!.listId, taskToDelete!._id);
        this.tasks$.next(
          this.tasks$.value.filter((task) => task._id !== _id)
        )
      })
  }

  editTask(_id: string, newName: string) {
    this.http.put(`tasks/${_id}`, { name: newName })
      .subscribe(() => {
        this.tasks$.next(
          this.tasks$.value.map((task) => task._id === _id ? { ...task, name: newName} : { ...task } )
        )
      })
  }

  changeTaskList(_id: string, listId: string) {
    const taskToChange = this.tasks$.value.find((task) => task._id === _id);

    if( taskToChange!.listId === listId ) return;

    this.boardService.changeTaskList(taskToChange!.boardId, taskToChange!.listId, listId, taskToChange!._id);
    this.tasks$.next(
      this.tasks$.value.map((task) => task._id === _id ? {...task, listId} : {...task})
    )

    this.http.patch(`tasks/${_id}`, { listId })
      .subscribe({
        error: (err) => {
          this.errorService.setError(err)
        }
    })
  }

  clear() {
    this.tasks$.next([]);
  }
}
