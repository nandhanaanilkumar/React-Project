import React, { useEffect, useState } from "react";

const ChatList = ({ onSelectChat,searchQuery }) => {

  const [chats, setChats] = useState([]);
useEffect(() => {
  console.log("CHATLIST SEARCH:", searchQuery); 
  const fetchChats = async () => {

    const loggedUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser) return;

    if (!searchQuery?.text) {

      const res = await fetch(
        `http://localhost:5000/conversations/${loggedUser.id}`
      );

      const data = await res.json();

      const formatted = (Array.isArray(data) ? data : [])
        .map(c => {

          const other = c.members.find(
            m => m._id !== loggedUser.id
          );

          if (!other) return null;

          return {
            id: c._id,
            name: `${other.firstName || ""} ${other.lastName || ""}`,
            avatar: other.profileImage,
            last: c.lastMessage || "",
            isNew: false,
            userId: other._id,
          };
        })
        .filter(Boolean);

      setChats(formatted);
      return;
    }

    const res = await fetch(
      `http://localhost:5000/search/messages/${loggedUser.id}?text=${searchQuery.text}`
    );
console.log("CALLING SEARCH API");
    const data = await res.json();

const formatted = [

  ...data.chats.map(c => ({
    id: c.conversationId,
    name: `${c.user.firstName} ${c.user.lastName}`,
    avatar: c.user.profileImage,
    last: c.lastMessage,
    isNew: false,
    isConnected: true,
    userId: c.user._id,
  })),

  ...data.users.map(u => ({
    id: null,
    name: `${u.firstName} ${u.lastName}`,
    avatar: u.profileImage,
    last: u.isConnected
      ? "Start conversation"
      : "Send connection request first",
    isNew: true,
    isConnected: u.isConnected,
    userId: u._id,
  })),
];

    setChats(formatted);
  };

  fetchChats();

}, [searchQuery]);


  return (
    <div style={styles.chatList}>
      <h3 style={{ marginBottom: 10 }}>Messaging</h3>

      {chats.map((chat) => (
        <div
          key={chat.id || chat.userId}
          style={styles.chatItem}
          onClick={() => onSelectChat(chat)}
        >
         <div style={styles.avatar}>
  {chat.avatar ? (
    <img
      src={chat.avatar}
      alt="user"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <img
      src="https://via.placeholder.com/40"
      alt="user"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
      }}
    />
  )}
</div>

          <div>
            <strong>{chat.name}</strong>
            <p style={styles.last}>{chat.last}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

const styles = {
  chatList: {
    width: "30%",
    borderRight: "1px solid #ddd",
    padding: 10,
  },
  chatItem: {
    display: "flex",
    gap: 10,
    padding: 10,
    cursor: "pointer",
    borderRadius: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    overflow: "hidden"
  },
  last: {
    fontSize: 12,
    color: "#666",
  },
};