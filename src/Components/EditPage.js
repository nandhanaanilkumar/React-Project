import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditDraft = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    const draft = drafts.find(d => d.id === Number(id));
    if (draft) setContent(draft.text);
  }, [id]);

  const updateDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    const updated = drafts.map(d =>
      d.id === Number(id) ? { ...d, text: content } : d
    );
    localStorage.setItem("drafts", JSON.stringify(updated));
    navigate("/drafts");
  };

  return (
    <div className="container mt-4">
      <textarea
        className="form-control mb-3"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn-primary" onClick={updateDraft}>
        Save
      </button>
    </div>
  );
};

export default EditDraft;
