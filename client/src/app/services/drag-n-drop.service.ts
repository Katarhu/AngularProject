import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DragNDropService {

  draggedTaskId = '';
  dragOver$ = new BehaviorSubject('');

  constructor() {
  }

  setDraggedTaskId(_id: string) {
    this.draggedTaskId = _id;
  }

  dragResult() {
    this.dragOver$.next(this.draggedTaskId);
    this.draggedTaskId = '';
    this.dragOver$.next('');
  }

}
