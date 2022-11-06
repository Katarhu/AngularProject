import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';
import {archiveTask, deleteTask, editTask} from "../../../../store/tasks/tasks.actions";
import {DragNDropService} from "../../../../services/drag-n-drop.service";
import {ITask} from "../../../../shared/models/task.model";
import {fromEvent, switchMap, takeUntil, tap} from "rxjs";
import {IAppStore} from "../../../../store/app.store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, AfterViewInit {

  @ViewChild('draggable') draggableChild!: ElementRef<HTMLElement>;
  @Input() task?: ITask;
  @Input() isDoneList?: boolean;


  constructor(
    private dndService: DragNDropService,
    private store: Store<IAppStore>
  ) {
  }

  get $draggable() {
    return this.draggableChild.nativeElement;
  }

  ngOnInit(): void {
  }

  deleteTask() {
    this.store.dispatch(deleteTask({_id: this.task!._id}));
  }

  archiveTask() {
    this.store.dispatch(archiveTask({_id: this.task!._id}));
  }

  changeTaskName(name: string) {
    this.store.dispatch(editTask({_id: this.task!._id, name}))
  }

  ngAfterViewInit() {

    const mouseDown$ = fromEvent<MouseEvent>(this.$draggable, 'mousedown')
      .pipe(
        tap(() => this.dndService.setDraggedTaskId(this.task!._id))
      );

    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(
        tap(() => {
          this.dndService.dragResult();

          this.$draggable.classList.remove('dragged');
          this.$draggable.style.removeProperty('left');
          this.$draggable.style.removeProperty('top');
        })
      );

    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');

    mouseDown$.pipe(
      switchMap((start) => mouseMove$.pipe(
        tap((event) => {
          this.$draggable.classList.add('dragged');
          this.$draggable.style.left = event.clientX - Math.abs(start.offsetX) + 'px';
          this.$draggable.style.top = event.clientY - Math.abs(start.offsetY) + 'px';
        }),
        takeUntil(mouseUp$)
      )),
    ).subscribe();
  }
}

