import PostActions from "./PostActions";

const PostRow = ({ post }) => {
  return (
    <tr>
      <td>{post.author}</td>
      <td>{post.content.slice(0, 40)}...</td>
      <td>{post.date}</td>
      <td>{post.likes}</td>
      <td>{post.comments}</td>
      <td>{post.reports}</td>
      <td>{post.status}</td>
      <td>
        <PostActions post={post} />
      </td>
    </tr>
  );
};

export default PostRow;
