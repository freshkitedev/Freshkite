import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NewPasswordAm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      // Send the change password request to the backend
      axios
        .post("http://localhost:9020/api/admin/newpasscode", {
          email,
          password
        })
        .then((response) => {
          // Handle successful response from the server
          console.log("Password changed successfully:", response.data);
          setSuccess(true);
          navigate("/Admin")
        })
        .catch((error) => {
          // Handle error response from the server
          console.log("Error changing password:", error.response.data);
          setError("Failed to change password. Please try again.");
        });
    } else {
      setError("Passwords do not match");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card border-0 shadow p-5" style={{ width: "400px" }}>
        <h5 className="card-title mb-0">
          <Link to="/enterotp">
            <i className="bi bi-skip-backward-fill"></i>
          </Link>
          &nbsp;&nbsp;Enter new password&nbsp;
          <i className="bi bi-pass-fill"></i>
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {error && <div className="text-danger mt-3">{error}</div>}
          {success && (
            <div className="text-success mt-3">
              Password changed successfully!
            </div>
          )}
          <div className="text-center mt-5">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
