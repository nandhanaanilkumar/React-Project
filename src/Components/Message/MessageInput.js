import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Write a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button style={styles.button} onClick={send}>
        Send
      </button>
      <button onClick={() => setText(text + "😊")}>
  😀
</button>
    </div>
  );
};

export default MessageInput;

const styles = {
  container: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: 10,
    padding: "8px 16px",
    background: "#0a66c2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
