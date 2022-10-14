import { Injectable } from '@angular/core';
import {animationFrameScheduler, BehaviorSubject, fromEvent, map, subscribeOn, switchMap, takeUntil, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DragNDropService {

  draggedTaskId = '';
  draggedListId = '';

  constructor() { }

  setDraggedTaskId(_id: string) {
    this.draggedTaskId = _id;
  }

  setDraggedListId(_id: string) {
    this.draggedListId  = _id;
  }

  dragResult() {
    const isSuccess = this.draggedTaskId && this.draggedListId;
    this.draggedListId = '';
    this.draggedTaskId = '';

    return isSuccess;
  }

}
