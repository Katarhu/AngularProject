import {ActionReducerMap} from "@ngrx/store";

import {IBoardState} from "../shared/models/board.model";
import {IListState} from "../shared/models/list.model";
import {ITaskState} from "../shared/models/task.model";

import {BoardEffects} from './boards/board.effects';
import {ListsEffects} from "./lists/lists.effects";
import {TasksEffects} from "./tasks/tasks.effects";

import {reducers as boardReducer } from "./boards/board.reducer";
import {reducers as listsReducer} from './lists/lists.reducer';
import {reducers as tasksReducer} from './tasks/tasks.reducer';

export interface IAppStore {
  boards: IBoardState;
  lists: IListState;
  tasks: ITaskState;
}

export const appEffects = [
  BoardEffects,
  ListsEffects,
  TasksEffects
];

export const appReducers: ActionReducerMap<IAppStore> = {
  boards: boardReducer,
  lists: listsReducer,
  tasks: tasksReducer
}


