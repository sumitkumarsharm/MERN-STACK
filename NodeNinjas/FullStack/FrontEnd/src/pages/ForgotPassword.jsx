import { useState } from "react";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await api.post("/forgotpassword", { email });
      alert("Reset link sent!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <form onSubmit={handleForgot}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
