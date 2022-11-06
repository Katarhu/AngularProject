import {IListState} from "../../shared/models/list.model";
import {createReducer, on} from "@ngrx/store";
import * as ListActions from './lists.actions'

export const initialState: IListState = {
  isLoading: false,
  lists: [],
  error: ''
}

export const reducers = createReducer(
  initialState,
  on(ListActions.getLists, (state) => ({...state, isLoading: true})),
  on(ListActions.getListsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    lists: [...state.lists, ...action.lists]
  })),
  on(ListActions.getListsFailure, (state, action) => ({...state, isLoading: false, error: action.message})),

  on(ListActions.deleteListsByBoard, (state, action) => ({
    ...state,
    lists: state.lists.filter((list) => list.boardId !== action._id)
  })),

  on(ListActions.changeListColorSuccess, (state, action) => ({
    ...state,
    lists: state.lists.map((list) => list._id === action._id ? {...list, color: action.color} : {...list})
  })),

  on(ListActions.clearListsState, () => initialState)
)
