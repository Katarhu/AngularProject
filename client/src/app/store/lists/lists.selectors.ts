import {IAppStore} from "../app.store";
import {createSelector} from "@ngrx/store";


const selectFeature = (state: IAppStore) => state.lists;

export const selectLists = createSelector(selectFeature, (state) => state.lists);
export const selectListsByBoard = (boardId: string) => createSelector(selectFeature,(state) => state.lists.filter((list) => list.boardId === boardId));
export const selectIsLoading = createSelector(selectFeature, (state) => state.isLoading);
export const selectError = createSelector(selectFeature, (state) => state.error);
