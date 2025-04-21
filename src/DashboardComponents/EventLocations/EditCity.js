"use client";
import Button from "../../components/Button";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditLocationModal from "./EditCityModal";
import EditCityModal from "./EditCityModal";
const EditCity = ({
  cityData,
  refreshEventLocationsList,
  className,
  stateList,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState(stateList);

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
        className={className}
      >
        <EditIcon />
      </Button>
      <EditCityModal
        cityData={cityData}
        refreshEventLocationsList={refreshEventLocationsList}
        isOpen={showModal}
        setIsOpen={setShowModal}
        stateList={states}
      />
    </>
  );
};
export default EditCity;
