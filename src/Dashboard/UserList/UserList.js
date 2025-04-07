import UserItem from "./UserItem";

const UserList = ({ userList }) => {
  return (
    <div>
      <div className="px-2 py-1">{userList.length} Users</div>
      <div className="flex flex-col">
        {userList.map((user, index) => (
          <UserItem user={user} key={index} />
        ))}
      </div>
    </div>
  );
};
export default UserList;
