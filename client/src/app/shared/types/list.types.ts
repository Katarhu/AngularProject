import {ITask} from "./tasks.types";

export interface IList {
  _id: string;
  boardId: string;
  name: string;
}

export interface IListWithTasks extends IList {
  tasks: ITask[];
}


export interface IListResponse {
  boardName?: string;
  lists: IListWithTasks[];
}
