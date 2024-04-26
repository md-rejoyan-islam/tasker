import { useContext, useState } from "react";
import Modal from "./Modal";
import SearchForm from "./SearchForm";
import TaskTable from "./TaskTable";
import TaskContext from "../context/taskContext";

export default function TaskSection() {
  const { deleteAllTasks } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

  // handle delete all tasks
  const handleDeleteAllTasks = () => {
    // show alert
    const confirm = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    // if user click cancel
    if (!confirm) return;

    // delete all tasks
    deleteAllTasks();
  };
  return (
    <>
      <section className="mb-20 xl:max-w-[1350px] mx-auto" id="tasks">
        <div className="container mx-auto">
          {/*  Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between block lg:flex ">
              <h2 className="text-2xl font-semibold max-sm:mb-4 lg:text-left text-center mb-4 lg:mb-0">
                Your Tasks
              </h2>
              <div className="flex items-center  flex-wrap gap-5">
                {/* search field  */}
                <SearchForm />
                <button
                  className="rounded-md bg-blue-500 hover:bg-blue-600 px-3.5 py-2.5 text-sm font-semibold"
                  onClick={() => setShowModal(!showModal)}
                >
                  Add Task
                </button>
                <button
                  className="rounded-md bg-red-500 hover:bg-red-600   px-3.5 py-2.5 text-sm font-semibold"
                  onClick={handleDeleteAllTasks}
                >
                  Delete All
                </button>
              </div>
            </div>
            <div className="overflow-auto">
              {/* task table  */}
              <TaskTable />
            </div>
          </div>
        </div>
      </section>

      {/* modal  */}
      {showModal && (
        <Modal
          title="Add New Task"
          modalToggle={() => setShowModal(!showModal)}
        />
      )}
    </>
  );
}
