const ChatItem = ({
  text,
  className,
  green = false,
}) => {
  return (
    <div className={`${className} flex my-2`}>
      <div className={`w-fit rounded-lg ${green ? "bg-green-500" : "bg-blue-200"} p-3`}>
        {text}
      </div>
    </div>
  );
};
export default ChatItem;
