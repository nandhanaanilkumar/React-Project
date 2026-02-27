import React, { useState } from "react";

const ResetPassword = ({ email, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    setError("");

    // password match check
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password changed successfully");

        // close modal / go login
        if (onClose) onClose();
      } else {
        setError(data.message || "Something went wrong");
      }

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Reset Password</h3>

        <input
          type="password"
          className="form-control my-2"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control my-2"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-primary w-100 mt-2" onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;