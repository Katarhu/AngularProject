import {Component, HostListener, Input, OnInit} from '@angular/core';
import {IListWithTasks} from "../../../../shared/types/list.types";
import {ListService} from "../../services/list.service";
import {SortBy} from "../../../../shared/types/sort.types";
import {ControlsBarService} from "../../../../services/controls-bar.service";
import {TaskService} from "../../services/task.service";
import {DragNDropService} from "../../../../services/drag-n-drop.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @HostListener('dragleave', ['$event'])
  ds(event: DragEvent) {
    event.preventDefault();
    if( event.screenX === 0 && event.screenY === 0) {
      this.dndService.setDraggedListId(this.list!._id)
    }
  }

  @Input() list?: IListWithTasks;
  isAddTask = false;

  constructor(
    public controlsBarService: ControlsBarService,
    public taskService: TaskService,
    private dndService: DragNDropService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.isAddTask = true;
  }

  closeModal() {
    this.isAddTask = false;
  }

}
