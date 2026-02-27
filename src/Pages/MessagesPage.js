import { useState, useEffect } from "react";
import ChatList from "../Components/Message/ChatList";
import ChatWindow from "../Components/Message/Chatwindow";

const MessagesPage = () => {

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = async (chatId, text) => {

    const loggedUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    const res = await fetch("http://localhost:5000/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: chatId,
        sender: loggedUser.id,
        text,
      }),
    });

    const newMsg = await res.json();

    setMessages(prev => [...prev, newMsg]);
  };

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("openConversation"));

    if (stored) {
      setSelectedChat({
        id: stored._id,
        name: "",
      });

      localStorage.removeItem("openConversation");
    }

  }, []);

  return (
    <div style={styles.container}>

      <ChatList onSelectChat={setSelectedChat} />

      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        setMessages={setMessages}
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