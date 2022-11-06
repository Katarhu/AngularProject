import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlsBarService} from "../../../../services/controls-bar.service";
import {selectTasksByList} from "../../../../store/tasks/tasks.selectors";
import {DragNDropService} from "../../../../services/drag-n-drop.service";
import {changeListColor} from "../../../../store/lists/lists.actions";
import {IList, ListType} from "../../../../shared/models/list.model";
import {changeTaskList} from "../../../../store/tasks/tasks.actions";
import {fromEvent, Observable, Subscription, tap} from "rxjs";
import {ITask} from "../../../../shared/models/task.model";
import {TaskService} from "../../services/task.service";
import {IAppStore} from "../../../../store/app.store";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('$list') listChild!: ElementRef<HTMLElement>
  @Input() list?: IList;
  tasks$?: Observable<ITask[]>
  mousemove$!: Subscription
  ListType = ListType;
  isAddTask = false;


  constructor(
    public controlsBarService: ControlsBarService,
    public taskService: TaskService,
    private dndService: DragNDropService,
    private store: Store<IAppStore>
  ) {
  }

  get $list() {
    return this.listChild.nativeElement;
  }

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(selectTasksByList(this.list!._id)));
  }

  openModal() {
    this.isAddTask = true;
  }

  closeModal() {
    this.isAddTask = false;
  }

  changeListColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.store.dispatch(changeListColor({color, _id: this.list!._id}));
  }

  ngAfterViewInit() {
    const dragOverList$ = this.dndService.dragOver$;

    let subscription = dragOverList$.subscribe((taskId) => {
      this.confirmDrag(this.list!._id, taskId);
    });

    subscription.unsubscribe();

    this.mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        tap((event) => {
          const listRect = this.$list.getBoundingClientRect();

          if (
            event.pageX > listRect.left && event.pageX < listRect.right &&
            event.pageY > listRect.top && event.pageY < listRect.bottom &&
            this.dndService.draggedTaskId
          ) {
            if (subscription.closed) {
              subscription = dragOverList$.subscribe((taskId) => {
                this.confirmDrag(this.list!._id, taskId);
              });
            }
            return;
          }

          subscription.unsubscribe();

        })
      ).subscribe()
  }

  confirmDrag(listId: string, taskId: string) {
    if (taskId) {
      this.store.dispatch(changeTaskList({listId: listId, _id: taskId}))
    }
  }

  ngOnDestroy() {
    this.mousemove$.unsubscribe();
  }

}
