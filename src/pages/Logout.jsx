import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    localStorage.clear("accessToken", "userDetails");
    alert("You have been successfully logged out.");
    dispatch ({ type: "LOGOUT" });


    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout;
