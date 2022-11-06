import {createAction, props} from "@ngrx/store";
import {IBoard, ICreateBoard} from "../../shared/models/board.model";

// *********
// GET BOARDS

export const getBoards = createAction(
  '[Boards] Get Boards'
)

export const getBoardsSuccess = createAction(
  '[Boards] Get Boards Success',
  props<{ boards: IBoard[] }>()
)

export const getBoardsFailure = createAction(
  '[Boards] Get Boards Failure',
  props<{ message: string }>()
)

// *********
// ADD BOARD

export const addBoard = createAction(
  '[Boards] Create Board',
  props<ICreateBoard>()
)

export const addBoardSuccess = createAction(
  '[Boards] Create Board Success',
  props<{ board: IBoard }>()
)

export const addBoardFailure = createAction(
  '[Boards] Create Board Failure',
  props<{message: string}>()
)

// *********
// DELETE BOARD

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ _id: string }>()
)

export const deleteBoardSuccess = createAction(
  '[Boards] Delete Board Success',
  props<{ _id: string }>()
)

export const deleteBoardFailure = createAction(
  '[Boards] Delete Board Failure',
  props<{ message: string }>()
)


// *********
// CHANGE BOARD NAME

export const editBoard = createAction(
  '[Boards] Edit Board',
  props<{ _id: string, name: string }>()
)

export const editBoardSuccess = createAction(
  '[Boards] Edit Board Success',
  props<{ _id: string, name: string }>()
)

export const editBoardFailure = createAction(
  '[Boards] Edit Board Failure',
  props<{ message: string }>()
)

export const clearBoardState = createAction(
  '[Boards] Clear Board state'
)
