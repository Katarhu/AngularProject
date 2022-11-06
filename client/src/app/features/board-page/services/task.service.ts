import {ICreateTask, ITask} from "../../../shared/models/task.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
  ) {
  }


  init() {
    return this.http.get<ITask[]>(`tasks`)
  }

  createTask(task: ICreateTask) {
    return this.http.post<ITask>('tasks', task)
  }

  deleteTask({_id}: { _id: string }) {
    return this.http.delete(`tasks/${_id}`);
  }

  editTask({_id, name}: { _id: string, name: string }) {
    return this.http.put(`tasks/${_id}`, {name})
  }

  changeTaskList({_id, listId}: { _id: string, listId: string }) {
    return this.http.patch(`tasks/${_id}`, {listId})
  }

  archiveTask({_id}: { _id: string }) {
    return this.http.patch(`tasks/${_id}/archive`, {});
  }
}
