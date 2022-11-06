import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";

import {IBoard, ICreateBoard} from '../../../shared/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boards$ = new BehaviorSubject<IBoard[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  public init(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards')
  }

  // public getBoards(): Observable<IBoard[]> {
  //   return this.boards$
  // }

  public createBoard(board: ICreateBoard) {
    return this.http.post< IBoard >('boards', board);
  }

  public deleteBoard({ _id }: { _id: string }) {
    return this.http.delete(`boards/${_id}`);
  }

  //
  public updateBoardName({ _id, name }: {_id: string, name: string}) {
    return this.http.put< IBoard >(`boards/${_id}`, { name });
  }

  // public deleteBoardTask(boardId: string, listId: string, taskId: string) {
  //   if ( !this.boards$.value.length ) return;
  //
  //   const boardToChange = this.boards$.value.find((board) => board._id === boardId) as IBoard;
  //
  //
  //   const listToChange = boardToChange!.lists.find((list) => list._id === listId );
  //
  //   listToChange!.tasks = listToChange!.tasks.filter((listTaskId) => listTaskId !== taskId)
  //
  //   boardToChange.lists = boardToChange.lists.map((list) => list._id === listId ? {...listToChange} : { ...list }) as IBoard[];
  //
  //   this.boards$.next(
  //     this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange} : { ...board })
  //   )
  // }

  // public addBoardTask(boardId: string, listId: string, taskId: string) {
  //   if ( !this.boards$.value.length ) return;
  //
  //   const boardToChange = this.boards$.value.find((board) => board._id === boardId) as IBoardWithLists;
  //
  //   const listToChange = boardToChange!.lists.find((list) => list._id === listId);
  //
  //   listToChange!.tasks.push(taskId);
  //
  //   boardToChange!.lists = boardToChange!.lists.map((list) => list._id === listId ? { ...listToChange } : { ...list }) as IBoardList[];
  //
  //   this.boards$.next(
  //     this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange } : { ...board })
  //   )
  // }

  // public changeTaskList(boardId: string, oldListId: string, newListId: string, taskId: string) {
  //   if ( !this.boards$.value.length ) return;
  //
  //
  //   const boardToChange = this.boards$.value.find((board) => board._id === boardId ) as IBoardWithLists;
  //
  //   const oldList = boardToChange.lists.find((list) => list._id === oldListId) as IBoardList;
  //   const newList = boardToChange.lists.find((list) => list._id === newListId) as IBoardList;
  //
  //   oldList!.tasks = oldList!.tasks.filter((listTaskId) => listTaskId !== taskId);
  //
  //   newList!.tasks.push(taskId);
  //
  //   boardToChange.lists = boardToChange.lists.map((list) => list._id === oldListId ? { ...oldList } : {...list });
  //   boardToChange.lists = boardToChange.lists.map((list) => list._id === newListId ? { ...newList } : {...list });
  //
  //
  //   this.boards$.next(
  //     this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange } : { ...board })
  //   )
  // }

  public clear() {
    this.boards$.next([]);
  }
}
