import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Verify() {
  const { token } = useParams();

  useEffect(() => {
    api.get(`/verify/${token}`)
      .then(() => alert("Account verified! You can now login."))
      .catch(() => alert("Verification failed"));
  }, [token]);

  return <h2>Verifying account...</h2>;
}
