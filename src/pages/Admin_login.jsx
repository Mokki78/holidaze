import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export function LoginAdmin() {
  const { dispatch } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/admin");
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

        localStorage.setItem("accessToken", data.accessToken);

        const userDetails = {
          name: data.name,
          pass: data.password,
          avatar: data.avatar,

          venueManager: data.venueManager === true,
        };

        dispatch({ type: "LOGIN_SUCCESS", payload: userDetails });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/admin");
      } else {
        alert("Please enter a valid admin details");
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
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign In- Admin Account</h5>
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
                    className="btn btn-primary btn-block"
                  >
                    Login
                  </button>
                  <p className="text-center">
                    Switch to customer: <Link to="/login">Login</Link>
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
    </Layout>
  );
}

export default LoginAdmin;
