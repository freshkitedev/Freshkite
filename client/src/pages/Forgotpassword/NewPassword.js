import { useState } from "react";
import { Link } from "react-router-dom";

export function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Submit form
      console.log("Form submitted!");
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
            <i class="bi bi-skip-backward-fill"></i>
          </Link>
          &nbsp;&nbsp;Enter new password&nbsp;<i class="bi bi-pass-fill"></i>
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
