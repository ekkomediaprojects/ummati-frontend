import Button from "../../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const EditCityModal = ({
  isOpen,
  setIsOpen,
  refreshEventLocationsList,
  stateList,
  cityData,
}) => {
  const cancelButtonRef = useRef(null);
  const [locName, setLocName] = useState(cityData.name);
  const [selectedState, setSelectedState] = useState(
    // cityData.state
    //   ? cityData.state.id
    //   : stateList ? stateList?.length > 0 : ""
    //   ? stateList[0]?.id
    //   : ""
  );

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locName === "") {
      return;
    }
    if (selectedState === "") {
      return;
    }
    const response = await axios.post("/api/city/update", {
      name: locName,
      cityId: cityData.id,
      stateId: selectedState,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        setLocName("");
        setIsOpen(false);
        setTimeout(() => {
          refreshEventLocationsList();
        }, 300);
        return;
        break;
      case 401:
        setError("Please Enter a valid name");
        return;
        break;
      case 402:
        setError("Location Already Exists");
        return;
      default:
        setError("There was an error adding a location");
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
                    <div>Add Event Lcoation</div>
                    <hr className="mt-1" />
                    <form
                      action=""
                      onSubmit={handleSubmit}
                      className="mt-2 flex flex-col"
                    >
                      <label htmlFor="cname">City Name</label>
                      <input
                        type="text"
                        name="cname"
                        id="cname"
                        required
                        value={locName}
                        onChange={(e) => setLocName(e.currentTarget.value)}
                      />
                      <label htmlFor="state">State</label>
                      <select
                        name="state"
                        value={selectedState}
                        onChange={(e) =>
                          setSelectedState(e.currentTarget.value)
                        }
                      >
                        {stateList.map((state) => (
                          <option value={state.id}  key={state.id}>{state.name}</option>
                        ))}
                      </select>

                      {/* <input
                        type="text"
                        name="cname"
                        id="cname"
                        required
                        value={locName}
                        onChange={(e) => setLocName(e.currentTarget.value)}
                      /> */}
                      {error != "" && (
                        <div className="text-red-600">{error}</div>
                      )}
                      <div className="w-full">
                        <Button
                          type="submit"
                          className="ml-auto mt-1 rounded-full"
                        >
                          Update
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
export default EditCityModal;
