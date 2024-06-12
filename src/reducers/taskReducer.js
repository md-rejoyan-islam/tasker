import tasksData from "../data/tasks.json";
import {
  ADD_TASK,
  DELETE_ALL_TASKS,
  DELETE_TASK,
  MESSAGE_ERROR_EMPTY,
  SET_TASKS,
  TASK_ADD_TO_FAVORITE,
  UPDATE_TASK,
} from "./reducerTypes";

// initial state
export const initialState = {
  tasks: [...tasksData],
  primaryTasks: [...tasksData],
  error: null,
  loading: false,
  message: null,
};

// reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    // all tasks
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    // add task
    case ADD_TASK:
      const lastTaskId = state.tasks.length
        ? state.tasks[state.tasks.length - 1].id
        : 1;

      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: lastTaskId + 1 }],
        primaryTasks: [
          ...state.primaryTasks,
          { ...action.payload, id: lastTaskId + 1 },
        ],
        message: "Task added successfully",
      };

    // delete task
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        message: "Task deleted successfully",
        primaryTasks: state.primaryTasks.filter(
          (task) => task.id !== action.payload
        ),
      };

    // update task
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }

          return task;
        }),
        primaryTasks: state.primaryTasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }

          return task;
        }),
        message: "Task updated successfully",
      };

    // add to favorite
    case TASK_ADD_TO_FAVORITE:
      const task = state.tasks.find((task) => task.id === action.payload);
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isFavorite: !task.isFavorite };
          }
          return task;
        }),
        primaryTasks: state.primaryTasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isFavorite: !task.isFavorite };
          }
          return task;
        }),
        message: task.isFavorite
          ? "Task removed from favorite"
          : "Task added to favorite",
      };

    // delete all tasks
    case DELETE_ALL_TASKS:
      return {
        ...state,
        tasks: [],
        primaryTasks: [],
        message: "All tasks deleted successfully",
      };

    // message & error empty
    case MESSAGE_ERROR_EMPTY:
      return {
        ...state,
        message: null,
        error: null,
      };

    // default
    default:
      return state;
  }
};

export default taskReducer;
