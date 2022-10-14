import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {
  IBoard, IBoardList,
  IBoardWithLists,
  ICreateBoard
} from "../../../shared/types/board.types";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boards$ = new BehaviorSubject<IBoardWithLists[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  public init(): void {
    if( this.boards$.value.length ) return;
    this.http
      .get<IBoardWithLists[]>('boards')
      .subscribe((boards) => {
        console.log(boards);
        this.boards$.next(boards || [])
      })
  }

  public getBoards(): Observable<IBoardWithLists[]> {
    return this.boards$
  }

  public createBoard(board: ICreateBoard) {
    this.http.post<IBoardWithLists>('boards', board)
      .subscribe((board) => {
        this.boards$.next([
          ...this.boards$.value, { _id: board._id, name: board.name, description: board.description, createdAt: board.createdAt, lists: board.lists}
        ])
      })
  }

  public updateBoardName(_id: string, name: string) {
    this.http.put<IBoard>(`boards/${_id}`, { name })
      .subscribe({
        next: () => {
          this.boards$.next( this.boards$.value.map((board: IBoardWithLists) => board._id === _id ?  { ...board, name} : { ...board }));
        },
      });
  }

  public deleteBoard(_id: string) {
    this.http.delete(`boards/${_id}`)
      .subscribe({
        next: () => {
          this.boards$.next(
            this.boards$.value.filter((board: IBoardWithLists) => board._id !== _id )
          );
        },
      });
  }

  public deleteBoardTask(boardId: string, listId: string, taskId: string) {
    const boardToChange = this.boards$.value.find((board) => board._id === boardId) as IBoardWithLists;


    const listToChange = boardToChange!.lists.find((list) => list._id === listId );

    listToChange!.tasks = listToChange!.tasks.filter((listTaskId) => listTaskId !== taskId)

    boardToChange.lists = boardToChange.lists.map((list) => list._id === listId ? {...listToChange} : { ...list }) as IBoardList[];

    this.boards$.next(
      this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange} : { ...board })
    )
  }

  public addBoardTask(boardId: string, listId: string, taskId: string) {
    const boardToChange = this.boards$.value.find((board) => board._id === boardId) as IBoardWithLists;

    const listToChange = boardToChange!.lists.find((list) => list._id === listId);

    listToChange!.tasks.push(taskId);

    boardToChange!.lists = boardToChange!.lists.map((list) => list._id === listId ? { ...listToChange } : { ...list }) as IBoardList[];

    this.boards$.next(
      this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange } : { ...board })
    )
  }

  public changeTaskList(boardId: string, oldListId: string, newListId: string, taskId: string) {
    const boardToChange = this.boards$.value.find((board) => board._id === boardId ) as IBoardWithLists;

    const oldList = boardToChange.lists.find((list) => list._id === oldListId) as IBoardList;
    const newList = boardToChange.lists.find((list) => list._id === newListId) as IBoardList;

    oldList!.tasks = oldList!.tasks.filter((listTaskId) => listTaskId !== taskId);
    newList!.tasks.push(taskId);

    boardToChange.lists = boardToChange.lists.map((list) => list._id === oldListId ? { ...oldList } : {...list });
    boardToChange.lists = boardToChange.lists.map((list) => list._id === newListId ? { ...newList } : {...list });

    this.boards$.next(
      this.boards$.value.map((board) => board._id === boardId ? { ...boardToChange } : { ...board })
    )
  }

  public clear() {
    this.boards$.next([]);
  }
}
