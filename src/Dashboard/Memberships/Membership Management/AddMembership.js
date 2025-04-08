"use client";
import React, { useState } from "react";
import {Button} from "@mui/material";
import AddMembershipModal from "./AddMembershipModal";

const AddMembership = ({
  users,
  refreshmembershipsList,
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
      <AddMembershipModal
        users={users}
        refreshmembershipsList={refreshmembershipsList}
        isOpen={showModal}
        setIsOpen={setShowModal}
      />
    </>
  );
};
export default AddMembership;
