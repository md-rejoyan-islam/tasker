import Form from "./Form";
import { useRef, useEffect } from "react";

export default function Modal({ modalToggle, title, data, isOpen }) {
  const popupRef = useRef(null);

  let count = 0;

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target) && count) {
      count = count + 1;
      modalToggle();
    } else {
      count++;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="justify-center bg-[#061819d6]  modal items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0  z-50 outline-none focus:outline-none">
        <div className=" absolute top-0 bottom-o flex left-0 right-0 items-center   py-4 w-[calc(95%)]  sm:w-[calc(80%)]  mx-auto max-w-3xl   justify-center">
          {/* content  */}
          <div ref={popupRef} className="w-full">
            <Form modalToggle={modalToggle} data={data} title={title} />
          </div>
        </div>
      </div>
    </>
  );
}
