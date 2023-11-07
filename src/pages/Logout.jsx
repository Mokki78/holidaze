import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear("accessToken", "userDetails");
    alert("You have been successfully logged out.");

    navigate("/");
  }, []);

  return null;
}

export default Logout;
