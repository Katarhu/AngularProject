import {IList} from "../../../shared/models/list.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) {
  }


  init(boardId?: string): Observable<IList[]> {

    if (boardId) {
      return this.http.get<IList[]>(`lists?boardId=${boardId}`)
    }

    return this.http.get<IList[]>(`lists`)
  }

  changeListColor({color, _id}: { color: string, _id: string }) {
    return this.http.patch(`lists/${_id}`, {color});
  }
}
