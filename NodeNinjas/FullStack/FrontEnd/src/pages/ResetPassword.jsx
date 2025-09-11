// pages/ResetPassword.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const { token } = useParams(); // usually /reset/:token
  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
      <button type="submit">Reset Password</button>
    </form>
  );
}
