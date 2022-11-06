import {IAppStore} from "../app.store";
import {createSelector} from "@ngrx/store";


const selectFeature = (state: IAppStore) => state.tasks;

export const selectTasksByList = (listId: string) =>
  createSelector(selectFeature, (state) => state.tasks.filter((task) => task.listId === listId));

export const selectTasksByBoard = (boardId: string) =>
  createSelector(selectFeature, (state) => state.tasks.filter((task) => task.boardId === boardId));

export const filterTasksByFilter = (filter: string) =>
  createSelector(selectFeature, (state) =>
    [...new Set(
      state.tasks.reduce((acc: string[], task) => {
        return (task.name.trim().toLowerCase().startsWith(filter.toLowerCase()) && task.listId) ? [...acc, task.boardId] : [...acc]
      }, [])
    )]
  )


export const selectArchivedTasks = (boardId: string) =>
  createSelector(selectFeature, (state) => state.tasks.filter((task) => task.boardId === boardId && task.listId === null))
