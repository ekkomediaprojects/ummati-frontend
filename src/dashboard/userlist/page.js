import UserListSection from "../../Dashboard/UserList/UserListSection";
// import { UserwithMembership } from "@/components/Dashboard/globalTypes";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import { getAllUsers } from "@/prisma/user";
// import { Role, User } from "@prisma/client";
// import { getServerSession } from "next-auth";

// async function getData() {
//   const session = await getServerSession(authOptions);
//   let users: UserwithMembership[] = [];
//   if (session && session.user.role === Role.ADMIN) {
//     users = await getAllUsers();
//   }
//   return {
//     session: session,
//     users: users,
//   };
// }
const users = [
  { id: "u123", firstName: "a Admin",lastName: "fati Admin", email: "admin@example.com", role: 'ADMIN' , createdAt : '12-2-2024'  },
  { id: "u124", firstName: "Sarah User",lastName: "fati Admin",  email: "sarah@example.com", role: 'USER',createdAt : '12-2-2024' },
  { id: "u125", firstName: "John Smith",lastName: "fati Admin",  email: "john@example.com", role: 'USER' ,createdAt : '12-2-2024'},
  { id: "u126", firstName: "Jane Doe",lastName: "fati Admin",  email: "jane@example.com", role: 'USER',createdAt : '12-2-2024' },
];

export default function UserList() {
  // const { session, users } = await getData();
  return <UserListSection users={users} />;
}
