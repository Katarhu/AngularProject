import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IListWithTasks} from "../../../../shared/types/list.types";
import {ListService} from "../../services/list.service";
import {SortBy} from "../../../../shared/types/sort.types";
import {ControlsBarService} from "../../../../services/controls-bar.service";
import {TaskService} from "../../services/task.service";
import {DragNDropService} from "../../../../services/drag-n-drop.service";
import {BehaviorSubject, fromEvent, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild('$list') listChild!: ElementRef<HTMLElement>
  get $list() {
    return this.listChild.nativeElement;
  }

  @Input() list?: IListWithTasks;
  isAddTask = false;

  // @HostListener('mouseover', ['$event'])
  // setDropList() {
  //   if( this.dndService.draggedTaskId ) {
  //     console.log(this.list?._id)
  //     this.dndService.setDraggedListId(this.list!._id)
  //   }
  // }

  constructor(
    public controlsBarService: ControlsBarService,
    public taskService: TaskService,
    private dndService: DragNDropService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const dragOverList$ = this.dndService.dragOver$;

    let subscription = dragOverList$.subscribe((taskId) => {
      this.confirmDrag(this.list!._id, taskId);
    });

    subscription.unsubscribe();

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        tap((event) => {
          const listRect = this.$list.getBoundingClientRect();

          if(
            event.pageX >  listRect.left && event.pageX < listRect.right &&
            event.pageY > listRect.top && event.pageY < listRect.bottom &&
            this.dndService.draggedTaskId
          ) {
            if( subscription.closed ) {
              subscription = dragOverList$.subscribe((taskId) => {
                this.confirmDrag(this.list!._id, taskId);
              });
            }
            return;
          }

          subscription.unsubscribe();

        })
      ).subscribe()

    // fromEvent(document, 'mousedown')
    //   .pipe(
    //     tap(console.log)
    //   ).subscribe()

  }

  confirmDrag(listId: string, taskId: string) {
    if( taskId ) {
      this.taskService.changeTaskList(taskId, listId);
    }
  }

  openModal() {
    this.isAddTask = true;
  }

  closeModal() {
    this.isAddTask = false;
  }

}
