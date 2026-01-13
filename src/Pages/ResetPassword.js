import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    alert("Password reset successful");
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>

      <input
        type="password"
        className="form-control my-2"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control my-2"
        placeholder="Confirm password"
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error && <p className="text-danger">{error}</p>}

      <button className="btn btn-primary" onClick={resetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
