
import ChatList from "./ChatList";

const AdminSupportSection = ({ session }) => {
  const mockUsers = [
    { id: "1", firstName: "Alice", lastName: "Johnson", email: "alice@example.com" },
    { id: "2", firstName: "Bob", lastName: "Smith", email: "bob@example.com" },
  ];
  return (
    <div >
      <ChatList allChatUsers={mockUsers} alreadySelected="1" />
           
    </div>
  );
};
export default AdminSupportSection;
