import {IAppStore} from "../app.store";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: IAppStore) => state.boards;

export const selectIsLoading = createSelector(selectFeature, (state) => state.isLoading);
export const selectBoards = createSelector(selectFeature, (state) => state.boards);
export const selectError = createSelector(selectFeature, (state) => state.error);

export const selectBoardName = (_id: string) => createSelector(selectFeature,
  (state) => state.boards.find(board => board._id === _id)?.name
)
