import { createSelector } from "reselect";

const getSearchTerm = (state) => state.taskReducer.searchTerm;
const getFilteredTasks = (state) => {
  return state.taskReducer.lists;
};

export const getListsFilteredBySearchTerm = createSelector(
  [getFilteredTasks, getSearchTerm],
  (lists, searchTerm) => {
    if (!searchTerm) return lists;
    else
      return lists.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
);
