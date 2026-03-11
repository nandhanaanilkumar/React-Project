import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const styles = {
  page: {
    background: "#f3f2ef",
    minHeight: "100vh",
    padding: "40px 15px",
  },

  wrapper: {
    maxWidth: "720px",
    margin: "0 auto",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },

  header: {
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    color: "#0a66c2",
    fontWeight: "700",
  },

  subTitle: {
    marginTop: "4px",
    color: "#666",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    minHeight: "140px",
    borderRadius: "12px",
    border: "1px solid #d0d0d0",
    padding: "12px",
    fontSize: "15px",
    outline: "none",
    resize: "none",
    marginBottom: "15px",
  },

  previewBox: {
    marginBottom: "15px",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #eee",
  },

  previewImage: {
    width: "100%",
    maxHeight: "420px",
    objectFit: "cover",
    display: "block",
  },

  uploadLabel: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #0a66c2",
    color: "#0a66c2",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "12px",
  },

  error: {
    color: "#d93025",
    fontSize: "14px",
    marginBottom: "10px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },

  draftBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #999",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "500",
  },

  cancelBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    background: "#e4e6eb",
    cursor: "pointer",
    fontWeight: "500",
  },

  postBtn: {
    padding: "8px 22px",
    borderRadius: "20px",
    border: "none",
    background: "#0a66c2",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
const MAX_FILE_SIZE = 50* 1024 * 1024;
const [fileError, setFileError] = useState("");
const [previewUrl, setPreviewUrl] = useState(null);
 useEffect(() => {

  const draftId = localStorage.getItem("editDraftId");

  if (draftId) {

    fetch(`http://localhost:5000/draft/${draftId}`)
      .then(res => res.json())
      .then(data => {

        setContent(data.text);
        setPreviewUrl(data.mediaUrl);

      });

  }

}, []);

  const saveDraft = async () => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  let mediaUrl = null;

  if (media) {
    const reader = new FileReader();

    reader.onloadend = async () => {

      mediaUrl = reader.result;

      await fetch("http://localhost:5000/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: loggedUser.id,
          text: content,
          mediaUrl
        })
      });

      alert("Draft saved");
      navigate("/drafts");
    };

    reader.readAsDataURL(media);

  } else {

    await fetch("http://localhost:5000/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedUser.id,
        text: content,
        mediaUrl: null
      })
    });

    alert("Draft saved");
    navigate("/drafts");
  }
};


 

const handlePost = async () => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const draftId = localStorage.getItem("editDraftId");

  let mediaUrl = previewUrl || null;

  // If new media uploaded convert to base64
  if (media) {
    const reader = new FileReader();

    reader.onloadend = async () => {

      mediaUrl = reader.result;

      if (draftId) {
        await fetch(`http://localhost:5000/editPost/${draftId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: content,
            mediaUrl
          })
        });

        localStorage.removeItem("editDraftId");

      } else {

        await fetch("http://localhost:5000/createPost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: loggedUser.id,
            text: content,
            mediaUrl
          })
        });

      }

      navigate("/home");
    };

    reader.readAsDataURL(media);

  } else {

    if (draftId) {

      await fetch(`http://localhost:5000/editPost/${draftId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          mediaUrl
        })
      });

      localStorage.removeItem("editDraftId");

    } else {

      await fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: loggedUser.id,
          text: content,
          mediaUrl
        })
      });

    }

    navigate("/home");
  }
};

const handleMediaChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    setFileError("Image size must be less than 50 MB");
    e.target.value = "";   
    setMedia(null);
    return;
  }

  setFileError("");
  setMedia(file);
  setPreviewUrl(URL.createObjectURL(file));
};

 return (
  <div style={styles.page}>
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h4 style={styles.title}>Create Post</h4>
          <p style={styles.subTitle}>
            Share something with your network
          </p>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          style={styles.textarea}
        />

        {/* Media Preview */}
       {previewUrl && (
  <div style={styles.previewBox}>
    {media?.type?.startsWith("video") ? (
      <video controls style={styles.previewImage}>
        <source src={previewUrl} />
      </video>
    ) : (
      <img src={previewUrl} alt="preview" style={styles.previewImage} />
    )}
  </div>
)}

        {/* Upload */}
        <label style={styles.uploadLabel}>
          📷 Add photo or video
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            style={{ display: "none" }}
          />
        </label>

        {fileError && (
          <div style={styles.error}>
            ⚠️ {fileError}
          </div>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button
            style={styles.draftBtn}
            onClick={saveDraft}
            disabled={!content.trim()}
          >
            💾 Save Draft
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={styles.cancelBtn}
              onClick={() => navigate("/Home")}
            >
              Cancel
            </button>

            <button
              style={styles.postBtn}
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
);
};

export default CreatePost;
