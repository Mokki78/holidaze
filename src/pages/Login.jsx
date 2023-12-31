import React, {  useEffect,  useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export function Login() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/profile");
    }
  }, [navigate]);


  const loginAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loginValues = {
      email: email,
      password: password,
    };

    const apiUrl = "https://api.noroff.dev/api/v1/holidaze/auth/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValues),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitting(false);

       
        const userDetails = {
          name: data.name,
          pass: data.password,
          avatar: data.avatar,
          isAdmin: data.venueManager === false,
        };
        dispatch ({ type: "LOGIN_SUCCESS", payload: userDetails });

        localStorage.setItem("accessToken",  data.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/profile");
      
      } else {
        setIsSubmitting(false);
        const errorData = await response.json();
        if (errorData.errors !== undefined) {
          setValidationErrors(errorData.errors);
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("An error occurred:");
    }
  };

  return (
    
      <div className="row justify-content-md-center justify-content-sm-center  mt-5">
           <Helmet>
            <title>Holidaze Login</title>
            <meta name="description" content="Login page for user." />
            <meta name="keywords" content="Login page user account react booking app" />
          </Helmet>
        <div className="col-4 col-sm-5 p-sm-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign In</h5>
              <form
                onSubmit={(e) => {
                  loginAction(e);
                }}
              >
                {Object.keys(validationErrors).length !== 0 && (
                  <p className="text-center ">
                    <small className="text-danger">
                      Incorrect Email or Password
                    </small>
                  </p>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="mainButton"
                  >
                    Login
                  </button>
                  <p className="text-center">
                    Switch to Admin: <Link to="/admin_login">Login Admin</Link>
                  </p>
                  <p className="text-center">
                    Don't have account?{" "}
                    <Link to="/register">Register here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Login;
