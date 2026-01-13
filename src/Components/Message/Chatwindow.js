import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedChat, messages, onSend }) => {
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
              alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
              background: msg.sender === "me" ? "#0a66c2" : "#e4e6eb",
              color: msg.sender === "me" ? "#fff" : "#000",
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
        onSend={(text) => onSend(selectedChat.id, text)} // 🔥 chat-specific
      />
    </div>
  );
};

export default ChatWindow;
