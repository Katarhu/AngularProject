import {ITask} from "./task.model";

export interface IList {
  _id: string;
  boardId: string;
  name: string;
  tasks: ITask[];
  color: string;
  createdAt: string;
}

export interface IListState {
  isLoading: boolean;
  lists: IList[];
  error: string;
}

export enum ListType {
  DONE = "Done",
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress'
}
