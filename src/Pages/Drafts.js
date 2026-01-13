import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDrafts(JSON.parse(localStorage.getItem("drafts")) || []);
  }, []);

  const deleteDraft = (id) => {
    const updated = drafts.filter((d) => d.id !== id);
    localStorage.setItem("drafts", JSON.stringify(updated));
    setDrafts(updated);
  };

  const publishDraft = (draft) => {
    console.log("Published:", draft);
    deleteDraft(draft.id);
    alert("🚀 Draft published!");
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
          key={draft.id}
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
                onClick={() => editDraft(draft.id)}
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
                onClick={() => deleteDraft(draft.id)}
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
