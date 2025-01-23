import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassowrd, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (password != value) setError("Password entered is not match");
    else setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5002/signup", { name, email, password })
      .then((result) => {
        if (result.data === "success") {
          Navigate("/login");
        }
      })
      .catch((err) => console.log(err));

    i;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
