import {
  FETCH_LISTS_LOADING,
  FETCH_LISTS_FAILURE,
  FETCH_LISTS_SUCCESS,
  UPDATING_TASK_FAILURE,
  UPDATING_TASK_LOADING,
  UPDATING_TASK_SUCCESS,
  SEARCH_TASK,
} from "../constant/action-type";

const initialState = {
  loading: false,
  lists: [],
  error: null,
  searchTerm: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lists: [...state.lists, ...action.payload.lists],
      };
    case UPDATING_TASK_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATING_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATING_TASK_SUCCESS:
      const lists = [...state.lists];
      const idx = lists.findIndex((item) => item.id === action.payload.task.id);
      if (idx !== -1) lists[idx] = action.payload.task;
      return {
        ...state,
        loading: false,
        error: null,
        lists,
      };
    case SEARCH_TASK:
      return { ...state, ...{ searchTerm: action.payload } };

    default:
      return state;
  }
};

export default taskReducer;
