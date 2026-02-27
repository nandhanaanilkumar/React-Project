import {
  deletePost,
  hidePost,
  warnPost,
} from "../Services/AdminPostApi";

const PostActions = ({ post, refresh }) => {

  const handleDelete = async () => {
    await deletePost(post.id);
    refresh();
  };

  const handleHide = async () => {
    await hidePost(post.id);
    refresh();
  };

  const handleWarn = async () => {
    await warnPost(post.id);
    refresh();
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleHide}>Hide</button>
      <button onClick={handleWarn}>Warn</button>
      <button>Preview</button>
    </>
  );
};

export default PostActions;