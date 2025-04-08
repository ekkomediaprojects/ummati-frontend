"use client";
import {Button} from "@mui/material";
import { useEffect, useState } from "react";
import AddMembership from "./AddMembership";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import MembershipUserItem from "./MembershipUserItem";
const MembershipManagementSection = ({
  session,
  usersList,
}) => {
  const cancelMembership = async (userId, membershipID) => {
    const response = await axios.post("/api/membership/cancel", {
      userId: userId,
      membershipId: membershipID,
    });
    if (response.data.status === 200) {
      alert("deleted!");
      refreshmembershipsList();
    } else {
      alert("There was an issue deleting this");
      refreshmembershipsList();
    }
  };

  const refreshmembershipsList = async () => {
    // const response = await axios.get("/api/user/getAll");
    // if (response.data.status === 200) {
    //   setUsers(response.data.users);
    // }
  };
  useEffect(() => {
    refreshmembershipsList();
  }, []);

  const [users, setUsers] = useState(usersList);
  console.log(users);
  return (
    <div className=" text-themeblack w-full">
      <div className="flex justify-between">
        <div className="text-base font-medium">Memberships</div>
        <AddMembership
          users={users}
          refreshmembershipsList={refreshmembershipsList}
        />
      </div>
      <hr className="my-2" />

      <div className="w-full text-center text-xs mt-2 font-poppins uppercase grid md:grid-cols-3 px-2">
        {users.map((user, index) => (
          <MembershipUserItem
            cancelMembership={cancelMembership}
            user={user}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default MembershipManagementSection;
