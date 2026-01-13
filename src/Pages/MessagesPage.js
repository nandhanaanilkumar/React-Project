import { useState } from "react";
import ChatList from "../Components/Message/ChatList";
import ChatWindow from "../Components/Message/Chatwindow";

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
const [chatMessages, setChatMessages] = useState({});

 const sendMessage = (chatId, text) => {
    setChatMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), { text, sender: "me" }],
    }));
  };

  return (
    <div style={styles.container}>
      <ChatList onSelectChat={setSelectedChat} />

      <ChatWindow selectedChat={selectedChat} 
      messages={selectedChat? chatMessages[selectedChat.id] || [] : []  }
      onSend={sendMessage}
      />

    </div>
  );
};

export default MessagesPage;

const styles = {
  container: {
    display: "flex",
    height: "90vh",
    border: "1px solid #ddd",
    fontFamily: "Arial, sans-serif",
  },
};
