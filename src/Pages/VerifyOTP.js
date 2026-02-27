import React, { useState, useEffect } from "react";

const VerifyOTP = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if(res.ok){
      onVerified(); // go next page
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth:"400px"}}>
      <div className="card p-4 shadow">
        <h3 className="text-center">Verify OTP</h3>
        <p className="text-muted text-center">
          OTP sent to {email}
        </p>

        <input
          className="form-control my-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <p className="text-center text-muted">Expires in {timer}s</p>

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-success w-100" onClick={verifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;