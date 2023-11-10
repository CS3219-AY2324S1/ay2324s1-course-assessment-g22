import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    while (Cookies.get("_auth") === undefined) {
      window.location.reload();
    }
    navigate(`/`, { replace: true });
  }, [navigate]);

  return <div>Loading</div>;
}
