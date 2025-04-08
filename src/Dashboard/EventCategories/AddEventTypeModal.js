import Button from "../../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { FormEvent, Fragment, SetStateAction, useRef, useState } from "react";

const AddEventTypeModal = ({
  isOpen,
  setIsOpen,
  refreshEventTypeList,
}) => {
  const cancelButtonRef = useRef(null);
  const [catname, setCatname] = useState("");

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (catname === "") {
      return;
    }
    const response = await axios.post("/api/eventtype/create", {
      name: catname,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        setIsOpen(false);
        setCatname("");
        setTimeout(() => {
          refreshEventTypeList();
        }, 300);
        return;
        break;
      case 401:
        setError("Please Enter a valid name");
        return;
        break;
      case 402:
        setError("Event Type Already Exists");
        return;
      default:
        setError("There was an error adding a type");
        return;
    }

    setTimeout(() => {
      refreshEventTypeList();
    }, 300);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col w-full pt-4">
                    <div>Add Event Category</div>
                    <hr className="mt-1" />
                    <form action="" onSubmit={handleSubmit} className="mt-2">
                      <label htmlFor="fname">Category Name</label>
                      <input
                        type="text"
                        name="cname"
                        id="cname"
                        required
                        value={catname}
                        onChange={(e) => setCatname(e.currentTarget.value)}
                      />
                      {error != "" && (
                        <div className="text-red-600">{error}</div>
                      )}
                      <div className="w-full">
                        <Button
                          type="submit"
                          className="ml-auto mt-1 rounded-full"
                        >
                          Add
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddEventTypeModal;
