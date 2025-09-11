// pages/Verify.jsx
import { useState } from "react";
import api from "../api/api";

export default function Verify() {
  const [code, setCode] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/verify", { code });
      alert("Account verified!");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Verification Code" />
      <button type="submit">Verify</button>
    </form>
  );
}
