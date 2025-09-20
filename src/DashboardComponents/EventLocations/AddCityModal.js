import Button from "../../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useRef, useState } from "react";

const AddCityModal = ({
  isOpen,
  setIsOpen,
  refreshEventLocationsList,
  stateList,
}) => {
  const cancelButtonRef = useRef(null);
  const [locName, setLocName] = useState("");
  console.log("statelist",stateList)

  const [selectedState, setSelectedState] = useState([]
    // stateList.length > 0 ? stateList[0].id : ""
  );

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locName === "" || selectedState === "") {
      setError("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("/api/city/create", {
        name: locName,
        stateId: selectedState,
      });

      switch (response.data.status) {
        case 200:
          setError("");
          setLocName("");
          setSelectedState("");
          setIsOpen(false);
          setTimeout(() => {
            refreshEventLocationsList();
          }, 300);
          return;
        case 401:
          setError("Please enter a valid name");
          return;
        case 402:
          setError("Location already exists");
          return;
        default:
          setError("There was an error adding a location");
          return;
      }
    } catch (err) {
      setError("Server error. Please try again.");
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

        {/* Centering the modal */}
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
              <Dialog.Title className="text-lg font-semibold">
                Add City
              </Dialog.Title>
              <hr className="mt-2 mb-4" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* City Name */}
                <div>
                  <label
                    htmlFor="cname"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    City Name
                  </label>
                  <input
                    type="text"
                    id="cname"
                    value={locName}
                    onChange={(e) => setLocName(e.currentTarget.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                               focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter city name"
                    required
                  />
                </div>

                {/* State Select */}
                <div>
                  <label
                    htmlFor="state"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.currentTarget.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
                               focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="">Select a state</option>
                    {stateList.map((state) => (
                      <option value={state.id} key={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddCityModal;
