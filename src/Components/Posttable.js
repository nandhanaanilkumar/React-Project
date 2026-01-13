const PostsTable = () => {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h3>Posts</h3>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>React Performance</td>
            <td>John</td>
            <td>Published</td>
            <td>❌ Delete</td>
          </tr>
          <tr>
            <td>Clean Code Tips</td>
            <td>Jane</td>
            <td>Reported</td>
            <td>⚠ Review</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
