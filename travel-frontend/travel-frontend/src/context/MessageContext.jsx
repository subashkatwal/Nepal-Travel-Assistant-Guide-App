import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null); // message text
  const [type, setType] = useState("success"); // "success" or "error"

  const showMessage = (msg, msgType = "success") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(null), 4000); // hide after 4 seconds
  };

  return (
    <MessageContext.Provider value={{ message, type, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
