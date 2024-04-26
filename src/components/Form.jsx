import { useContext, useState } from "react";
import { toast } from "react-toastify";
import TaskContext from "../context/taskContext";

export default function Form({ modalToggle, title, data }) {
  // data from context
  const { addTask, message, updateTask } = useContext(TaskContext);

  // fields state
  const [fields, setFields] = useState(
    data || {
      title: "",
      description: "",
      tags: "",
      priority: "",
    }
  );

  // handle input change
  const handleInputChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fields.title ||
      !fields.description ||
      !fields.tags ||
      !fields.priority
    ) {
      return toast.error("Please fill all fields");
    }

    // tags array
    const tagsArray = Array.isArray(fields.tags)
      ? fields.tags
      : fields.tags.split(",");

    // if data is available then update task
    if (data) {
      // update task
      updateTask({
        ...fields,
        tags: tagsArray,
      });
    } else {
      // add task
      addTask({
        ...fields,
        tags: tagsArray,
      });

      // clear fields
      setFields({
        title: "",
        description: "",
        tags: "",
        priority: "",
      });
    }

    // close modal
    modalToggle();
  };

  return (
    <form
      className="mx-auto  w-full max-w-[740px] rounded-xl border  border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4  lg:p-11"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {title}
      </h2>

      {/* inputs  */}
      <div className="space-y-9 text-white lg:space-y-10">
        {/* title  */}
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            type="text"
            name="title"
            value={fields.title}
            id="title"
            onChange={handleInputChange}
          />
        </div>
        {/* description  */}
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            type="text"
            name="description"
            value={fields.description}
            onChange={handleInputChange}
            id="description"
          ></textarea>
        </div>
        {/* input group  */}
        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
          {/* tags  */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="tags"
              value={fields.tags}
              onChange={handleInputChange}
              id="tags"
            />
          </div>
          {/* priority  */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              name="priority"
              id="priority"
              onChange={handleInputChange}
              defaultValue={fields.priority}
            >
              <option defaultValue="">Select Priority</option>
              <option defaultValue="low">Low</option>
              <option defaultChecked="medium">Medium</option>
              <option defaultChecked="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* inputs ends  */}
      <div className="mt-16 flex justify-between lg:mt-20">
        <button
          onClick={(event) => {
            modalToggle();
          }}
          className="rounded  px-4 py-2 text-white transition-all hover:opacity-80 bg-red-500"
        >
          Close
        </button>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
        >
          Create new Task
        </button>
      </div>
    </form>
  );
}
