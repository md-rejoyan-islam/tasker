import { ToastContainer, toast } from "react-toastify";
import Modal from "./components/Modal";
import TaskHeader from "./components/TaskHeader";
import TaskSection from "./components/TaskSection";
import Footer from "./components/shareComponents/Footer";
import Navbar from "./components/shareComponents/Navbar";
import "@fontsource/inter";
import { useContext, useEffect, useReducer } from "react";
import TaskContextProvider from "./context/taskContextProvider";
import TaskContext from "./context/taskContext";
import data from "../src/data/tasks.json";

export default function App() {
  const { message, error, setMessageEmpty, tasks, setTasks } =
    useContext(TaskContext);

  // show error or success message and clear message
  useEffect(() => {
    message && toast.success(message);
    error && toast.error(error);
    setMessageEmpty();
  }, [message, error]);
  return (
    <>
      {/* main content  */}
      <main>
        <Navbar />
        <TaskHeader />
        <TaskSection />
        <Footer />
      </main>

      {/* toastify container  */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
