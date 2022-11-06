import {createReducer, on} from "@ngrx/store";
import {ITaskState} from "../../shared/models/task.model";
import * as TaskActions from './tasks.actions';

const initialState: ITaskState = {
  isLoading: false,
  tasks: [],
  error: ''
}


export const reducers = createReducer(
  initialState,
  on(TaskActions.getTasks, (state) => ({...state, isLoading: true})),
  on(TaskActions.getTasksSuccess, (state, action) => ({...state, isLoading: false, tasks: action.tasks})),
  on(TaskActions.getTasksFailure, (state, action) => ({...state, isLoading: false, error: action.message})),

  on(TaskActions.deleteTaskByBoard, (state, action) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.boardId !== action._id)
  })),

  on(TaskActions.createTaskSuccess, (state, action) => ({...state, tasks: [...state.tasks, action.task]})),

  on(TaskActions.deleteTaskSuccess, (state, action) => ({
    ...state,
    tasks: state.tasks.filter((task) => task._id !== action._id)
  })),

  on(TaskActions.editTaskSuccess, (state, action) => ({
    ...state,
    tasks: state.tasks.map((task) => task._id === action._id ? {...task, name: action.name} : {...task})
  })),

  on(TaskActions.changeTaskList, (state, action) => ({
    ...state,
    tasks: state.tasks.map((task) => task._id === action._id ? {...task, listId: action.listId} : {...task})
  })),

  on(TaskActions.archiveTaskSuccess, (state, action) => ({
    ...state,
    tasks: state.tasks.map((task) => task._id === action._id ? {...task, listId: null} : {...task})
  })),

  on(TaskActions.clearTaskState, () => initialState)
)
