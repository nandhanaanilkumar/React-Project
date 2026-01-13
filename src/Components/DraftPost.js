import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DraftPost = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(storedDrafts);
  }, []);

  return (
    <div className="container mt-4">
      <h4>Saved drafts</h4>

      {drafts.length === 0 && <p>No drafts saved</p>}

      {drafts.map(draft => (
        <div key={draft.id} className="card p-3 mb-2">
          <p>{draft.text}</p>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/edit-draft/${draft.id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default DraftPost;
