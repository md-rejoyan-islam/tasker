import { useReducer } from "react";

import {
  ADD_TASK,
  ALL_TASKS,
  DELETE_ALL_TASKS,
  DELETE_TASK,
  MESSAGE_ERROR_EMPTY,
  SET_TASKS,
  TASK_ADD_TO_FAVORITE,
  UPDATE_TASK,
} from "../reducers/reducerTypes";
import TaskContext from "./taskContext";
import taskReducer, { initialState } from "../reducers/taskReducer";
import { toast } from "react-toastify";
import db from "../data/tasks.json";

// task context provider
const TaskContextProvider = ({ children }) => {
  // state
  const [{ tasks, error, message, primaryTasks }, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  // all tasks
  const setTasks = async (tasks) => {
    dispatch({
      type: SET_TASKS,
      payload: tasks,
    });
  };

  // add task
  const addTask = async (task) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  // delete task
  const deleteTask = async (id) => {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };

  // update task
  const updateTask = async (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };

  // add to favorite
  const addToFavorite = async (id) => {
    dispatch({
      type: TASK_ADD_TO_FAVORITE,
      payload: id,
    });
  };

  // delete all tasks
  const deleteAllTasks = async () => {
    dispatch({
      type: DELETE_ALL_TASKS,
    });
  };

  // show message and error notification
  const setMessageEmpty = () => {
    dispatch({
      type: MESSAGE_ERROR_EMPTY,
    });
  };

  // task context data
  const taskContextData = {
    tasks,
    setTasks,
    addTask,
    error,
    message,
    deleteTask,
    updateTask,
    addToFavorite,
    deleteAllTasks,
    setMessageEmpty,
    primaryTasks,
  };

  // return provider
  return (
    <TaskContext.Provider value={taskContextData}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
