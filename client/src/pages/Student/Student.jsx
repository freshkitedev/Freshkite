import React, { useState } from "react";
import "./Student.css";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import axios from "axios";

const Student = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [phone, setContact] = useState("");
  const [validContact, setValidContact] = useState(true);
  const [contactError, setContactError] = useState("");
  const [year, setYear] = useState("");

  const [selectedCourse, setSelectedCourse] = useState("");

  const passwordScore = zxcvbn(password).score;
  let passwordStrength = "Weak";
  let passwordColor = "bg-danger";
  if (passwordScore === 3) {
    passwordStrength = "Strong";
    passwordColor = "bg-warning";
  } else if (passwordScore === 4) {
    passwordStrength = "Very Strong";
    passwordColor = "bg-success";
  } else if (password) {
    passwordStrength = "Medium";
    passwordColor = "bg-info";
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword && validContact) {
      axios
        .post("http://localhost:9020/api/students/register", {
          name,
          email,
          phone,
          password,
          selectedCourse,
          year,
        })
        .then((response) => {
          console.log(response.data);
          alert("successfully Registered");
          navigate("/studentlogin");
          // Display success message or navigate to login page
        })
        .catch((error) => {
          console.log(error);
          alert("error");
          // Display error message to user
        });
    } else {
      if (password !== confirmPassword) {
        setPasswordMatch(false);
      }
      if (!validContact) {
        setContactError("Please enter a valid 10-digit contact number");
      }
    }
  };

  const courses = [
    { name: "BE", fees: 40000 },
    { name: "B.Sc", fees: 50000 },
    { name: "B.Com", fees: 6000 },
    { name: "12", fees: 12000 },
  ];

  const handleContactChange = (event) => {
    const contactValue = event.target.value;
    // check if the entered value is a number and has 10 digits
    if (!isNaN(contactValue) && contactValue.length === 10) {
      setContact(contactValue);
      setValidContact(true);
      setContactError("");
    } else {
      setContact(contactValue);
      setValidContact(false);
      setContactError("Please enter a valid 10-digit contact number");
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Student Registration Form{" "}
                <Link to="/">
                  <i class="bi bi-house"></i>
                </Link>
              </h5>
              <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    value={selectedCourse}
                    onChange={(event) => setSelectedCourse(event.target.value)}
                  >
                    <option value="" disabled selected>
                      Choose your course
                    </option>
                    {courses.map((course) => (
                      <option key={course.name} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">Course</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className={`form-control ${
                      validContact ? "" : "is-invalid"
                    }`}
                    id="contact"
                    placeholder="Contact"
                    value={phone}
                    onChange={handleContactChange}
                  />
                  <label htmlFor="contact">Contact</label>
                  {!validContact && (
                    <div className="invalid-feedback">{contactError}</div>
                  )}
                </div>

                {selectedCourse && (
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="fees"
                      placeholder="Fees"
                      value={
                        courses.find((course) => course.name === selectedCourse)
                          .fees
                      }
                      readOnly
                    />
                    <label htmlFor="fees">Fees</label>
                  </div>
                )}

                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                  <label for="floatingInput">Year</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <label htmlFor="password">Password</label>
                  {password && (
                    <div
                      className={`text-${passwordColor} password-strength-indicator`}
                    >
                      {passwordStrength}
                    </div>
                  )}
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="Password"
                    class="form-control"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <label for="confirmPassword">Repeat password</label>
                  {!passwordMatch && (
                    <div class="text-danger">Passwords do not match</div>
                  )}
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    disabled={!passwordMatch}
                  >
                    Register
                  </button>
                </div>
                <br></br>
                <div class="d-flex justify-content-center">
                  <h6>
                    Already Registered?{" "}
                    <Link to="/studentlogin">Login Here</Link>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Student;
