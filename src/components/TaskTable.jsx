import { useContext, useState } from "react";
import tasksData from "../data/tasks.json";
import { randomColor } from "../helpers/helpers";
import { toast } from "react-toastify";
import TaskContext from "../context/taskContext";
import Modal from "./Modal";

export default function TaskTable() {
  // data from context
  const { tasks, addToFavorite, deleteTask } = useContext(TaskContext);

  // modal on/off state
  const [modal, setModal] = useState({
    open: false,
    task: null,
  });

  // handle toggle favorite
  const handleToggleFavorite = (id) => {
    addToFavorite(id);
  };

  // update task
  const handleUpdateTask = (task) => {
    // modal on
    setModal({
      open: true,
      task,
    });
  };

  // handle delete task
  const handleDeleteTask = (id) => {
    // show alert
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );

    // if user click cancel
    if (!confirm) return;

    // delete task
    deleteTask(id);
  };

  return (
    <>
      {/* task table  */}
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
              Title
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
              Description
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
              Tags
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Priority
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, index) => (
            <tr
              className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
              key={task?.id}
            >
              <td>
                <svg
                  onClick={() => handleToggleFavorite(task.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-star cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke={task?.isFavorite ? "yellow" : "white"}
                  fill={task?.isFavorite ? "yellow" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
              </td>
              <td>{task?.title}</td>
              <td>
                <div>{task?.description}</div>
              </td>
              <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                  {task.tags.map((tag, index) => (
                    <li key={index}>
                      <span
                        className={`inline-block h-5 whitespace-nowrap  rounded-[45px]  px-2.5 text-sm capitalize text-[#becddb]`}
                        style={{ backgroundColor: randomColor() }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-center">{task?.priority}</td>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="bg-red-500 text-[12px] text-white py-1 px-2 rounded-sm hover:bg-red-600"
                    onClick={() => handleDeleteTask(task?.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white py-1 px-2 rounded-sm text-[12px] hover:bg-violet-500  bg-blue-500"
                    onClick={() => handleUpdateTask(task)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {/* if task not found */}
          {!tasks?.length && (
            <tr>
              <td colSpan="6" className="text-center">
                <p className="text-red-400 py-2 bg-[#80646420]">
                  Task List is empty!
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modal.open && (
        <Modal
          title="Update Task"
          data={modal.task}
          modalToggle={() => setModal(!modal.open)}
        />
      )}
    </>
  );
}
