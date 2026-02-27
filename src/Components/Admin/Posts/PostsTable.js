import { useEffect, useState } from "react";
import { getPosts } from "../Services/AdminPostApi";
import PostRow from "./PostRow";

const PostsTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await getPosts();

    setPosts(
      res.data.map((p) => ({
        id: p._id,
        author: p.author?.firstName || "Unknown",
        text: p.text,
        likes: p.likes,
        comments: p.commentsCount,
        reports: p.reports,
        status: p.status,
        date: new Date(p.createdAt).toLocaleDateString(),
      }))
    );
  };

  return (
    <table width="100%" border="1" cellPadding="8">
      <thead>
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
    <PostRow
      key={post.id}
      post={post}
      refresh={fetchPosts}   // ⭐ IMPORTANT
    />
  ))}
</tbody>
    </table>
  );
};

export default PostsTable;