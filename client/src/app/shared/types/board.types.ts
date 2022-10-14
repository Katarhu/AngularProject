export interface IBoard {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface IBoardList {
  _id: string;
  name: string;
  tasks: string[];
}

export interface IBoardWithLists extends IBoard{
  lists: IBoardList[];
}

export interface IBoardsResponse {
  boards: IBoard[];
  message: string;
}

export interface ICreateBoard {
  name: string;
  description: string;
}
