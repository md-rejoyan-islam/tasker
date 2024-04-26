import Form from "./Form";

export default function Modal({ modalToggle, title, data }) {
  return (
    <>
      <div className="justify-center bg-[#061819d6] items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0  z-50 outline-none focus:outline-none">
        <div className=" absolute top-0 bottom-o flex left-0 right-0 items-center   py-4  w-auto  mx-auto max-w-3xl  ">
          {/* content  */}
          <div>
            <Form modalToggle={modalToggle} data={data} title={title} />
          </div>
        </div>
      </div>
    </>
  );
}
