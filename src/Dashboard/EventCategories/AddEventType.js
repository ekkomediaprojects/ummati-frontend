"use client";
import React from "react";
import Button from "../../components/Button";
import { useState } from "react";
import AddEventTypeModal from "./AddEventTypeModal";

const AddEventType = ({
  refreshEventTypeList,
}) => {
  const [showModal, setShowModal] = useState(false);
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
      <AddEventTypeModal
        refreshEventTypeList={refreshEventTypeList}
        isOpen={showModal}
        setIsOpen={setShowModal}
      />
    </>
  );
};
export default AddEventType;
