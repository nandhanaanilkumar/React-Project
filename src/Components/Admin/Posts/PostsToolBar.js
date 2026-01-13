const PostsToolbar = () => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
      <input placeholder="Search by author, keyword, ID" />

      <select>
        <option>All</option>
        <option>Most Liked</option>
        <option>Most Reported</option>
        <option>Recent</option>
      </select>

      <select>
        <option>Date</option>
        <option>Engagement</option>
      </select>
    </div>
  );
};

export default PostsToolbar;
