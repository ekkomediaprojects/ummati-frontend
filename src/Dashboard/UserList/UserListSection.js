"use client";
// import { searchUsers } from "@/components/Helper/helperFunctions";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import {Button} from "@mui/material";
// import { exportDataAsCSV } from "@/components/Helper/csvExportFuctions";

const UserListSection = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState(users);
  const [exportData, setexportData] = useState(users);
  const filterUsers = async () => {
    if (searchQuery != "") {
      // const users = await searchUsers(searchQuery);
      setUserList(users);
    }
  };
  useEffect(() => {
    filterUsers();
  }, [searchQuery]);
  useEffect(() => {
    const newExportData = userList.map((user) => {
      return {
        ...user,
        password: "",
        avatar: window.location.origin + user.avatar,
      };
    });
    setexportData(newExportData);
  }, [userList]);

  return (
    <div className=" text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between">
        <div className="text-base font-medium">Users</div>
        <Button
          type="button"
          className="rounded-full"
          onClick={() => "hello" 
            // exportDataAsCSV(
            //   exportData,
            //   `UserList_${new Date().toUTCString().replace(" ", "_")}`
            // )
          }
        >
          Export
        </Button>
      </div>
      <hr className="my-2" />
      <div>
        {/* <label htmlFor="search">Search Users</label> */}
        <input
          type="text"
          name="search"
          autoComplete="new-password"
          autoCorrect="off"
          id=""
          placeholder="Search for a user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>

      <UserList userList={userList} />
    </div>
  );
};
export default UserListSection;
