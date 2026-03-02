import { useEffect, useState } from "react";
import { getPosts } from "../Services/AdminPostApi";
import PostRow from "./PostRow";
import PostsToolbar from "./PostsToolBar";

const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const fetchPosts = async () => {
    const res = await getPosts(search);
  console.log("POST DATA:", res.data); // ⭐ ADD HERE

    setPosts(
      res.data.map((p) => ({
        id: p._id,
        author: p.userId?.firstName || "Unknown",
        text: p.text,
        likes: p.likes || 0,
        comments: p.commentsCount || 0,
        reports: p.reports || 0,
        date: new Date(p.updatedAt).toLocaleDateString(), // ⭐ edited date
      }))
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛠 Admin Post Management</h2>

      <PostsToolbar
        search={search}
        setSearch={setSearch}
      />

      <table style={styles.table}>
        <thead style={styles.head}>
          <tr>
            <th>Author</th>
            <th>Content</th>
            <th>Updated</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Reports</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              refresh={fetchPosts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    background: "#f5f7fb",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  title: {
    color: "#004182",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
  },
  head: {
    background: "#004182",
    color: "white",

  },
};

export default PostsTable;