import {createAction, props} from "@ngrx/store";
import {ICreateTask, ITask} from "../../shared/models/task.model";

//*****
//GET TASKS

export const getTasks = createAction(
  '[Tasks] Get Tasks'
)

export const getTasksSuccess = createAction(
  '[Tasks] Get Tasks Success',
  props<{ tasks: ITask[] }>()
)

export const getTasksFailure = createAction(
  '[Tasks] Get Tasks Failure',
  props<{ message: string }>()
)

//****
//CREATE TASK

export const createTask = createAction(
  '[Tasks] Create Task',
  props<ICreateTask>()
)

export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: ITask }>()
)

export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ message: string }>()
)

//****
//DELETE TASK

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ _id: string }>()
)

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ _id: string }>()
)

export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ message: string }>()
)

//****
//DELETE TASK BY BOARD

export const deleteTaskByBoard = createAction(
  '[Tasks] Delete Tasks',
  props<{ _id: string }>()
)

//****
//EDIT TASK

export const editTask = createAction(
  '[Tasks] Edit Task',
  props<{ _id: string, name: string }>()
)

export const editTaskSuccess = createAction(
  '[Tasks] Edit Task Success',
  props<{ _id: string, name: string }>()
)

export const editTaskFailure = createAction(
  '[Tasks] Edit Task Failure',
  props<{ message: string }>()
)

//****
//CHANGE TASK LIST
export const changeTaskList = createAction(
  '[Tasks] Change Task List',
  props<{ _id: string, listId: string }>()
)

export const changeTaskListSuccess = createAction(
  '[Tasks] Change Task List Success',
  props<{ _id: string, listId: string }>()
)

export const changeTaskListFailure = createAction(
  '[Tasks] Change Task List Failure',
  props<{ message: string }>()
)

export const archiveTask = createAction(
  '[Tasks] Archive task',
  props<{ _id: string }>(),
)

export const archiveTaskSuccess = createAction(
  '[Tasks] Archive task Success',
  props<{ _id: string }>(),
)

export const archiveTaskFailure = createAction(
  '[Tasks] Archive task Failure',
  props<{ message: string }>(),
)

export const clearTaskState = createAction(
  '[Tasks] Clear Tasks State'
)

