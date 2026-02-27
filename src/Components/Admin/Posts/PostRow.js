import PostActions from "./PostActions";

const PostRow = ({ post, refresh }) => {
  return (
    <tr>
      <td>{post.author}</td>
      <td>{(post.text || "").slice(0, 40)}...</td>
      <td>{post.date}</td>
      <td>{post.likes}</td>
      <td>{post.comments}</td>
      <td>{post.reports}</td>
      <td>{post.status}</td>
      <td>
        <PostActions
          post={post}
          refresh={refresh}   // ⭐ PASS HERE
        />
      </td>
    </tr>
  );
};

export default PostRow;
