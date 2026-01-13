import React, { useState } from "react";

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "350px",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "18px",
  cursor: "pointer",
};
const ForgotPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  // Generate random 6-digit OTP
  const generateOtp = () => {
    if (!email) {
    setError("Email is required");
    return;
  }
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    console.log("OTP (for demo):", randomOtp); // remove in real apps
    setStep(2);
      alert(`Your OTP is: ${randomOtp}`);

  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setStep(3);
      setError("");
    } else {
      setError("Invalid OTP");
    }
  };

  const resetPassword = () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    alert("Password reset successful!");
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <button style={closeBtn} onClick={onClose}>✖</button>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <h4>Forgot Password</h4>
            <input
              className="form-control my-3"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={generateOtp}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <h4>Verify OTP</h4>
            <input
              className="form-control my-3"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-success w-100" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <h4>Reset Password</h4>
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
            <button className="btn btn-primary w-100" onClick={resetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
