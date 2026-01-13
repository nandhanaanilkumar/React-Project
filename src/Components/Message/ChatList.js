const chats = [
  { id: 1, name: "Rahul Sharma", last: "Hey, how are you?" },
  { id: 2, name: "Ananya Patel", last: "Let’s connect" },
  { id: 3, name: "HR - Infosys", last: "Interview update" },
];

const ChatList = ({ onSelectChat }) => {
  return (
    <div style={styles.chatList}>
      <h3 style={{ marginBottom: 10 }}>Messaging</h3>

      {chats.map((chat) => (
        <div
          key={chat.id}
          style={styles.chatItem}
          onClick={() => onSelectChat(chat)}
        >
          <div style={styles.avatar}>{chat.name[0]}</div>

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
    background: "#0a66c2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  last: {
    fontSize: 12,
    color: "#666",
  },
};
