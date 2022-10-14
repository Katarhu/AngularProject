export interface ITask {
  _id: string;
  listId: string;
  boardId: string;
  name: string;
  createdAt: string;
}


export interface ICreateTask {
  boardId: string;
  listId: string;
  name: string;
}
