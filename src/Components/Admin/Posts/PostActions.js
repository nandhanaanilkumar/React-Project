const PostActions = ({ post }) => {
  const deletePost = () => {
    if (window.confirm("Delete this post?")) {
      console.log("Soft delete:", post.id);
    }
  };

  return (
    <>
      <button onClick={deletePost}>Delete</button>
      <button>Hide</button>
      <button>Warn</button>
      <button>Preview</button>
    </>
  );
};

export default PostActions;
