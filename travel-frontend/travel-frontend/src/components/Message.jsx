import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import "./../styles/message.css"; // add your styles

export default function Message() {
  const { message, type } = useContext(MessageContext);

  if (!message) return null;

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
}
