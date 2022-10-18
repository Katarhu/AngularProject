import {
  AfterViewInit,
  Component, ElementRef,
  HostListener,
  Input,
  OnInit, ViewChild,
} from '@angular/core';
import {ITask} from "../../../../shared/types/tasks.types";
import {TaskService} from "../../services/task.service";
import {DragNDropService} from "../../../../services/drag-n-drop.service";
import {fromEvent, switchMap, take, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit  {

  // @HostListener('drag', ['$event'])
  // onDrag(event: DragEvent) {
  //   event.preventDefault();
  //   (event.target as HTMLElement).classList.add('dragged')
  //   this.dndService.setDraggedTaskId(this.task!._id)
  // }
  //
  // @HostListener('dragend', ['$event'])
  // onDragEnd(event: DragEvent) {
  //   event.preventDefault();
  //
  //   const dragToList = this.dndService.dragResult();
  //
  //   if( dragToList ) {
  //     return this.taskService.changeTaskList(this.task!._id, dragToList);
  //   }
  //   (event.target as HTMLElement).classList.remove('dragged')
  // }

  @ViewChild('draggable') draggableChild!: ElementRef<HTMLElement>;
  get $draggable() {
    return this.draggableChild.nativeElement;
  }

  @ViewChild('name') nameInput!: ElementRef<HTMLInputElement>;
  get $nameInput() {
    return this.nameInput.nativeElement;
  }

  isInputFocused() {
    return this.$nameInput === document.activeElement;
  }

  @Input() task?: ITask;


  constructor(
    private taskService: TaskService,
    private dndService: DragNDropService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    const mouseDown$ = fromEvent<MouseEvent>(this.$draggable, 'mousedown')
      .pipe(
        tap(() =>  this.dndService.setDraggedTaskId(this.task!._id))
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
          this.$draggable.style.left =  event.pageX - start.offsetX  + 'px';
          this.$draggable.style.top =  event.pageY - start.offsetY + 'px';
        }),
        takeUntil(mouseUp$)
      )),
    ).subscribe();
  }

  deleteTask() {
    this.taskService.deleteTask(this.task!._id);
  }

  focusInput() {
    this.$nameInput.disabled = false;
    this.$nameInput.focus();
  }

  changeTaskName(name: string) {
    this.taskService.editTask(this.task!._id, name);
  }

}

