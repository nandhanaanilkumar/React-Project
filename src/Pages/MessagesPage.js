import { useState, useEffect } from "react";
import ChatList from "../Components/Message/ChatList";
import ChatWindow from "../Components/Message/Chatwindow";

const MessagesPage = ({ searchQuery, setSearchQuery }) => {

  console.log("MESSAGES PAGE:", searchQuery);
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

  const handleSelectChat = async (chat) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (chat.isNew && !chat.isConnected) {
    alert("Send connection request first");
    return;
  }

  // existing chat
  if (!chat.isNew) {
    setSelectedChat(chat);
    setSearchQuery({ text: "", page: "/messages" });
    return;
  }

  // create conversation
  const res = await fetch(
    "http://localhost:5000/conversation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: loggedUser.id,
        receiverId: chat.userId,
      }),
    }
  );

  const convo = await res.json();

  setSelectedChat({
    id: convo._id,
    name: chat.name,
    avatar: chat.avatar,
    isNew: false,
  });
  setSearchQuery({ text: "", page: "/messages" });
};

  return (
    <div style={styles.container}>

      <ChatList onSelectChat={handleSelectChat}
      searchQuery={searchQuery} />

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