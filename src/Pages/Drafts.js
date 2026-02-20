import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
useEffect(() => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  fetch(`http://localhost:5000/drafts/${loggedUser.id}`)
    .then(res => res.json())
    .then(data => setDrafts(data));

}, []);


 const deleteDraft = async (id) => {

  await fetch(`http://localhost:5000/draft/${id}`, {
    method: "DELETE"
  });

  setDrafts(drafts.filter(d => d._id !== id));
};

  const publishDraft = async (draft) => {

  await fetch(`http://localhost:5000/publish/${draft._id}`, {
    method: "PUT"
  });

  alert("🚀 Draft published");

  setDrafts(drafts.filter(d => d._id !== draft._id));
};


  const editDraft = (draftId) => {
  localStorage.setItem("editDraftId", draftId);
  navigate("/createpost");
};


  return (
    <div className="container mt-4">
      <h3 className="mb-4">Saved Drafts</h3>

      {drafts.length === 0 && (
        <p className="text-muted">No drafts available</p>
      )}

      {drafts.map((draft) => (
        <div
          key={draft._id}
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body">
            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {draft.text}
            </p>
            
          </div>

          {draft.mediaUrl && (
            <img
              src={draft.mediaUrl}
              alt="draft"
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            />
          )}

          <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
            <small className="text-muted">
              Saved on {new Date(draft.savedAt).toLocaleString()}
            </small>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => editDraft(draft._id)}
              >
                ✏️ Edit
              </button>

              <button
                className="btn btn-success btn-sm"
                onClick={() => publishDraft(draft)}
              >
                🚀 Publish
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteDraft(draft._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drafts;
