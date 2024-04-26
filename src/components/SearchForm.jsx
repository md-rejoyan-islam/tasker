import { useContext, useState } from "react";
import TaskContext from "../context/taskContext";
import tasksData from "../data/tasks.json";

export default function SearchForm() {
  const { tasks, setTasks, primaryTasks } = useContext(TaskContext);

  // handle submit
  const handleSearch = (e) => {
    // e.preventDefault();
    const filteredTasks = primaryTasks.filter((task) =>
      task.title.toLowerCase().includes(e.toLowerCase())
    );
    setTasks(filteredTasks);
  };
  return (
    <form>
      <div className="flex">
        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full bg-gray-800 px-4 py-2.5 pr-10 focus:outline-none"
            name="searchValue"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Task"
          />
          <button
            type="submit"
            className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-3"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
