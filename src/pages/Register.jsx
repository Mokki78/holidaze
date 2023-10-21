import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== null
    ) {
      navigate("/register");
    }
  }, []);

  const registerAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: name,
      email: email,
      password: password,
      avatar: avatar || null,
      venueManager: venueManager,
    };

    const apiUrl = "https://api.noroff.dev/api/v1/holidaze/auth/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitting(false);
        localStorage.setItem("token", data.token);
        navigate("/login");
      }
       if (venueManager === true) {
         navigate("/admin_login")
       }

      
       else {
        setIsSubmitting(false);
        const errorData = await response.json();
        if (errorData.errors !== undefined) {
          setValidationErrors(errorData.errors);
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("An error occurred:", error);
    }
  };

  return (
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Register</h5>
              <form onSubmit={(e) => registerAction(e)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {validationErrors.name !== undefined && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.name[0]}
                      </small>
                    </div>
                  )}
                </div>
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
                  {validationErrors.email !== undefined && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.email[0]}
                      </small>
                    </div>
                  )}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password !== undefined && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.password[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">
                    Avatar
                  </label>
                  <input
                    type="text" 
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="venueManager" className="form-label">
                    Venue Manager
                  </label>
                  <input
                    type="checkbox" 
                    className="form-check-input"
                    id="venueManager"
                    name="venueManager"
                    checked={venueManager}
                    onChange={(e) => setVenueManager(e.target.checked)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Register Now
                  </button>
                  <p className="text-center">
                    Have already an account <Link to="/login">Login here</Link>
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

export default Register;
