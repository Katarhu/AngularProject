export interface ITask {
  _id: string;
  userId: string;
  listId: string | null;
  boardId: string;
  name: string;
  createdAt: string;
}


export interface ITaskState {
  isLoading: boolean;
  tasks: ITask[];
  error: string;
}

export interface ICreateTask {
  name: string;
  listId: string;
  boardId: string;
}
