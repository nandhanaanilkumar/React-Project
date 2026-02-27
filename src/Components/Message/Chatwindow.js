import React, { useEffect } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({
  selectedChat,
  messages,
  setMessages,
  onSend,
}) => {
const loggedUser =
  JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {

    if (!selectedChat) return;

    const fetchMessages = async () => {

      const res = await fetch(
        `http://localhost:5000/messages/${selectedChat.id}`
      );

      const data = await res.json();

      setMessages(Array.isArray(data) ? data : []);
    };

    fetchMessages();

  }, [selectedChat, setMessages]);

  // ⭐ No chat selected
  if (!selectedChat) {
    return <div style={{ margin: "auto" }}>Select a conversation</div>;
  }

  return (
    <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>

      <div style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        {selectedChat.name}
      </div>

      <div
        style={{
          flex: 1,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
            alignSelf:
  msg.sender === loggedUser.id ||
  msg.sender?._id === loggedUser.id
    ? "flex-end"
    : "flex-start",

background:
  msg.sender === loggedUser.id ||
  msg.sender?._id === loggedUser.id
    ? "#0a66c2"
    : "#e4e6eb",

color:
  msg.sender === loggedUser.id ||
  msg.sender?._id === loggedUser.id
    ? "#fff"
    : "#000",
              padding: "8px 12px",
              borderRadius: 16,
              maxWidth: "60%",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <MessageInput
        onSend={(text) => onSend(selectedChat.id, text)}
      />
    </div>
  );
};

export default ChatWindow;