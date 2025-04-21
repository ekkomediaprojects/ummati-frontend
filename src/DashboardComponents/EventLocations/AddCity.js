"use client";
import Button from "../../components/Button";
import { useState } from "react";
import AddCityModal from "./AddCityModal";

const AddCity = ({
  refreshEventLocationsList,
  stateList,
}) => {
  const [showModal, setShowModal] = useState(false);
  console.log("stateList AddCity" , stateList)
  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
        className="bg-white border-black border-[1px] rounded-full !py-1"
      >
        Add
      </Button>
      <AddCityModal
        refreshEventLocationsList={refreshEventLocationsList}
        isOpen={showModal}
        setIsOpen={setShowModal}
        stateList={stateList}
      />
    </>
  );
};
export default AddCity;
