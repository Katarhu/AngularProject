import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {IList, IListResponse, IListWithTasks} from "../../../shared/types/list.types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists$ = new BehaviorSubject<IListWithTasks[]>([])

  constructor(
    private http: HttpClient
  ) { }


  init(boardId: string): Observable<string | undefined> {
    return this.http.get<IListResponse>(`lists?boardId=${boardId}`)
      .pipe(
        tap((value) => {
          const { lists } = value;
          this.lists$.next(lists);
        }),
        map((value) => value.boardName)
      )
  }

  getLists() {
    return this.lists$;
  }

  clear() {
    this.lists$.next([]);
  }
}
