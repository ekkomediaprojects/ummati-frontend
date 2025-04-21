import {Button} from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { FormEvent, Fragment, SetStateAction, useRef, useState } from "react";

const AddMembershipModal = ({
  isOpen,
  setIsOpen,
  users,
  refreshmembershipsList,
}) => {
  const cancelButtonRef = useRef(null);
  const [userId, setuserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startDate === "" || endDate === "" || userId === "") {
      setError("Please fill in all the fields");
      return;
    }
    const response = await axios.post("/api/membership/createorupdate", {
      userId,
      startDate,
      endDate,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        setuserId("");
        setStartDate("");
        setEndDate("");
        setIsOpen(false);
        setTimeout(() => {
          refreshmembershipsList();
        }, 300);
        return;
      default:
        setError("There was an error adding a membership");
        return;
    }
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
                    <div>Add Membership</div>
                    <hr className="mt-1" />
                    <form action="" onSubmit={handleSubmit} className="mt-2">
                      <label htmlFor="fname">Select User</label>
                      <select
                        name="eventType"
                        id=""
                        required
                        value={userId}
                        onChange={(e) => setuserId(e.currentTarget.value)}
                        className="w-full border-[#e4e6eb] border-[1px] py-3 mt-2 focus:border-black px-2"
                      >
                        <option value="">Select User</option>
                        {users.map((user, index) => {
                          if(true) {
                            return (
                              <option value={user.id} key={index}>
                                {user.id} - {user.email} - {user.firstName}{" "}
                                {user.lastName}
                              </option>
                            );
                          }
                        })}
                      </select>
                      <div className="mt-2">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                          type="date"
                          className="custom-input-field"
                          name="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.currentTarget.value)}
                          id=""
                        />
                      </div>
                      <div className="mt-2">
                        <label htmlFor="startDate">End Date</label>
                        <input
                          type="date"
                          className="custom-input-field"
                          name="startDate"
                          value={endDate}
                          onChange={(e) => setEndDate(e.currentTarget.value)}
                          id=""
                        />
                      </div>
                      {error != "" && (
                        <div className="text-red-600">{error}</div>
                      )}
                      <div className="w-full">
                        <Button
                          type="submit"
                          className="ml-auto mt-2 rounded-full"
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
export default AddMembershipModal;
