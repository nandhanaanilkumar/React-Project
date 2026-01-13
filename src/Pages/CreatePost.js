import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Navbar";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const [fileError, setFileError] = useState("");

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("editDraft"));
    if (draft) {
      setContent(draft.text);
      if (draft.mediaUrl) setMedia(draft.mediaUrl);
      localStorage.removeItem("editDraft");
    }
  }, []);

  const saveDraft = () => {
    if (media && media instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => storeDraft(reader.result);
      reader.readAsDataURL(media);
    } else {
      storeDraft(media);
    }
  };

  const storeDraft = (mediaUrl) => {
    const draft = {
      id: Date.now(),
      text: content,
      mediaUrl,
      savedAt: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    localStorage.setItem("drafts", JSON.stringify([draft, ...drafts]));

    alert("Post saved as draft");
    navigate("/drafts");
  };

  const handlePost = () => {
    console.log("Posted:", { content, media });
    navigate("/Home");
  };
const handleMediaChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    setFileError("Image size must be less than 2 MB");
    e.target.value = "";   
    setMedia(null);
    return;
  }

  setFileError("");
  setMedia(file);
};

  return (
    <>
      <Nav />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "14px", borderColor:"#004182" }}
            >
              <div className="card-body p-4">
                <h5 className="mb-3">Create a post</h5>

                <textarea
                  className="form-control mb-3"
                  rows="5"
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ borderRadius: "10px", fontSize: "15px", borderColor:"#004182" }}
                />

                {/* 🖼️ IMAGE PREVIEW */}
                {typeof media === "string" && (
                  <img
                    src={media}
                    alt="preview"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "420px", objectFit: "cover" }}
                  />
                )}

                <input
                  type="file"
                  accept="image/*,video/*"
                  className="form-control mb-3"
onChange={handleMediaChange}
                />
{fileError && (
  <div className="text-danger mb-2">
    ⚠️ {fileError}
  </div>
)}

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={saveDraft}
                    disabled={!content.trim()}
                  >
                    💾 Save Draft
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-light"
                      onClick={() => navigate("/Home")}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary px-4"
                      disabled={!content.trim()}
                      onClick={handlePost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
