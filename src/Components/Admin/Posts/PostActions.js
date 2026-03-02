import {
  deletePost,
  hidePost,
  warnPost,
  previewPost,
} from "../Services/AdminPostApi";

const PostActions = ({ post, refresh }) => {

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
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

  const handlePreview = async () => {
    const res = await previewPost(post.id);
    alert(res.data.text);
  };

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleHide}>Hide</button>
      <button onClick={handleWarn}>Warn</button>
      <button onClick={handlePreview}>Preview</button>
    </div>
  );
};

export default PostActions;