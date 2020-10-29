import {
  FETCH_LISTS_FAILURE,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_LOADING,
  UPDATING_TASK_FAILURE,
  UPDATING_TASK_LOADING,
  UPDATING_TASK_SUCCESS,
  SEARCH_TASK,
} from "../constant/action-type";
import { getTaskList, updateTask } from "../services/api";

export const fetchLists = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchListsLoading());
      const lists = await getTaskList();
      dispatch(fetchListsSuccess(lists));
    } catch (e) {
      dispatch(fetchListsFailure(e));
    }
  };
};

export const updateTasks = (item) => {
  return async (dispatch) => {
    try {
      dispatch(updateTaskLoading());
      const lists = await updateTask(item);
      dispatch(updateTaskSuccess(lists));
    } catch (e) {
      dispatch(updateTaskFailure(e));
    }
  };
};

export const searchTask = (item) => {
  return (dispatch) => {
    dispatch(search(item));
  };
};

const fetchListsSuccess = (lists) => ({
  type: FETCH_LISTS_SUCCESS,
  payload: {
    lists,
  },
});

const fetchListsLoading = () => ({
  type: FETCH_LISTS_LOADING,
});

const fetchListsFailure = (error) => ({
  type: FETCH_LISTS_FAILURE,
  payload: {
    error,
  },
});

const updateTaskSuccess = (task) => ({
  type: UPDATING_TASK_SUCCESS,
  payload: {
    task,
  },
});

const updateTaskLoading = () => ({
  type: UPDATING_TASK_LOADING,
});

const updateTaskFailure = (error) => ({
  type: UPDATING_TASK_FAILURE,
  payload: {
    error,
  },
});

const search = (term) => {
  return {
    type: SEARCH_TASK,
    payload: term,
  };
};
