const PostsToolbar = ({ search, setSearch }) => {
  return (
    <div style={styles.toolbar}>
      <input
        style={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎 Search posts..."
      />
    </div>
  );
};

const styles = {
  toolbar: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

export default PostsToolbar;