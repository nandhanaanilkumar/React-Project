import React, { useState, useEffect } from "react";

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
  padding: "25px",
  borderRadius: "10px",
  width: "360px",
  position: "relative",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
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
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");

  // ⭐ TIMER STATE
  const [timer, setTimer] = useState(60);

  /* ============================
      COUNTDOWN TIMER
  ============================ */
  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, timer]);

  /* ============================
      SEND OTP
  ============================ */
  const generateOtp = async () => {
    if (!email) {
      setError("Email required");
      return;
    }

    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStep(2);
      setTimer(60); // reset timer
      setError("");
    } else {
      setError("Failed to send OTP");
    }
  };

  /* ============================
      VERIFY OTP
  ============================ */
  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      setStep(3);
      setError("");
    } else {
      setError(data.message);
    }
  };

  /* ============================
      RESET PASSWORD
  ============================ */
  const resetPassword = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Password changed successfully");
      onClose();
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <button style={closeBtn} onClick={onClose}>✖</button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h4 className="text-center mb-3">Forgot Password</h4>

            <input
              className="form-control mb-3"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-danger">{error}</p>}

            <button className="btn btn-primary w-100" onClick={generateOtp}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h4 className="text-center mb-3">Verify OTP</h4>

            <p className="text-muted small text-center">
              OTP sent to {email}
            </p>

            <input
              className="form-control mb-2"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* TIMER DISPLAY */}
            <p className="text-center text-muted">
              OTP expires in: {timer}s
            </p>

            {/* RESEND BUTTON */}
            {timer === 0 && (
              <button
                className="btn btn-link w-100"
                onClick={generateOtp}
              >
                Resend OTP
              </button>
            )}

            {error && <p className="text-danger">{error}</p>}

            <button className="btn btn-success w-100" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h4 className="text-center mb-3">Reset Password</h4>

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