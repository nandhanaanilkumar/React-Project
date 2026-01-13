import PostRow from "./PostRow";

const PostsTable = () => {
  const posts = [
    {
      id: 1,
      author: "John Doe",
      content: "This is a sample post about React performance optimization.",
      likes: 12,
      comments: 4,
      reports: 2,
      status: "Active",
      date: "2026-01-10",
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Clean code is more important than clever code.",
      likes: 30,
      comments: 10,
      reports: 0,
      status: "Active",
      date: "2026-01-09",
    },
    {
      id: 3,
      author: "Alex Johnson",
      content: "This post contains misleading financial advice.",
      likes: 5,
      comments: 2,
      reports: 6,
      status: "Hidden",
      date: "2026-01-08",
    },
    {
      id: 4,
      author: "Chris Martin",
      content: "Offensive language used in this post.",
      likes: 1,
      comments: 0,
      reports: 12,
      status: "Deleted",
      date: "2026-01-07",
    },
  ];

  return (
    <table
      width="100%"
      border="1"
      cellPadding="8"
      style={{ borderCollapse: "collapse" }}
    >
      <thead style={{ background: "#f3f4f6" }}>
        <tr>
          <th>Author</th>
          <th>Content</th>
          <th>Date</th>
          <th>Likes</th>
          <th>Comments</th>
          <th>Reports</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;
