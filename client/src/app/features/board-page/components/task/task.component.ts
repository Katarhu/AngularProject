import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {ITask} from "../../../../shared/types/tasks.types";
import {TaskService} from "../../services/task.service";
import {DragNDropService} from "../../../../services/drag-n-drop.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit  {

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('dragged')
    this.dndService.setDraggedTaskId(this.task!._id)
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    event.preventDefault();

    const dragToList = this.dndService.dragResult();

    if( dragToList ) {
      return this.taskService.changeTaskList(this.task!._id, dragToList);
    }
    (event.target as HTMLElement).classList.remove('dragged')
  }

  @Input() task?: ITask;


  constructor(
    private taskService: TaskService,
    private dndService: DragNDropService
  ) { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.taskService.deleteTask(this.task!._id);
  }

  changeTaskName(name: string) {
    this.taskService.editTask(this.task!._id, name);
  }

}

