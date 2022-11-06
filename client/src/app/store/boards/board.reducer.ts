import {IBoardState} from "../../shared/models/board.model";
import * as BoardActions from './board.actions';
import {createReducer, on} from "@ngrx/store";

export const initialState: IBoardState = {
  isLoading: false,
  boards: [],
  filteredBoards: [],
  error: ''
}

export const reducers = createReducer(
  initialState,
  on(BoardActions.getBoards, (state) => ({...state, isLoading: true})),
  on(BoardActions.getBoardsSuccess, (state, action) => ({
    ...state,
    boards: action.boards,
    filteredBoards: action.boards,
    isLoading: false
  })),
  on(BoardActions.getBoardsFailure, (state, action) => ({...state, error: action.message, isLoading: false})),

  on(BoardActions.addBoardSuccess, (state, action) => ({...state, boards: [...state.boards, action.board]})),
  on(BoardActions.addBoardFailure, (state, action) => ({...state, error: action.message})),

  on(BoardActions.deleteBoardSuccess, (state, action) => ({
    ...state,
    boards: state.boards.filter((board) => board._id !== action._id)
  })),

  on(BoardActions.editBoardSuccess, (state, action) => ({
    ...state,
    boards: state.boards.map((board) => board._id === action._id ? {...board, name: action.name} : {...board})
  })),

  on(BoardActions.clearBoardState, () => initialState)
)
