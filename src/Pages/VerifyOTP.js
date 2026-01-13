import React, { useState } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });

    alert("OTP Verified");
  };

  return (
    <div className="container mt-5">
      <h3>Verify OTP</h3>

      <input
        className="form-control my-3"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn btn-success" onClick={verifyOtp}>
        Verify
      </button>
    </div>
  );
};

export default VerifyOTP;
