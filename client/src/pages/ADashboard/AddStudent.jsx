import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";
import { Link } from "react-router-dom";

export const AddStudent = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [phone, setContact] = useState("");
  const [validContact, setValidContact] = useState(true);
  const [contactError, setContactError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      course: course,
      year: year,
      email: email,
      password: password,
      phone: phone,
    };
    axios
      .post("http://localhost:9020/api/admin/createstudent", data)
      .then((result) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <body className="body">
      <div class="sidebar">
        <img
          class="img-fluid"
          src="https://static.wixstatic.com/media/81b34d_d1ef6ebfe8f5483c8097e7905ab82bb2~mv2.jpg/v1/fill/w_600,h_192,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/freshkite_small.jpg"
          alt="none"
        ></img>
        <Link to="/dashboard">
          Dashboard&nbsp;
          <i className="bi bi-speedometer2"></i>
        </Link>
        <Link to="/payfee">
          Pay Fee&nbsp;
          <i className="bi bi-credit-card"></i>
        </Link>
        <Link className="active" to="/addStudent">
          Add Student&nbsp;
          <i className="bi bi-person-add"></i>
        </Link>
        <Link to="/addCourse">
          Course&nbsp;
          <i className="bi bi-gear-wide-connected"></i>
        </Link>
        <Link to="/Addfee">
          Add Fees&nbsp; <i className="bi bi-plus-circle-dotted"></i>
        </Link>
        <Link to="/excel">
          Excel&nbsp;<i className="bi bi-file-earmark-spreadsheet"></i>
        </Link>
        <Link to="/">
          Logout &nbsp;
          <i className="bi bi-box-arrow-right"></i>
        </Link>
      </div>

      <div class="content">
        <div class="row">
          <div class="col-sm-3 col-md-7 col-lg-5 mx-auto ">
            <div
              class=" bg-light card border-0 shadow rounded-4 my-4"
              style={{ background: "	rgb(255,255,255)", color: "#000000" }}
            >
              <div class="card-body p-4 p-sm-4">
                <form onSubmit={handleSubmit}>
                  <div class="form-floating mb-2">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-2">
                    <select
                      className="form-control form-select mb-3"
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select a course
                      </option>
                      <option value="BE">BE</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="12">12th</option>
                      <option value="BA">BA</option>
                    </select>
                    <label htmlFor="course">Course</label>
                  </div>

                  <div class="form-floating mb-2">
                    <input
                      type="date"
                      class="form-control"
                      id="floatingPassword"
                      min="1950-01-01" max="2070-12-31" step="1"
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                      value={year}
                    />
                    <label for="floatingPassword">Passed Out Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className={`form-control ${
                        validContact ? "" : "is-invalid"
                      }`}
                      id="contact"
                      value={phone}
                      onChange={handleContactChange}
                    />
                    <label htmlFor="contact">Contact</label>
                    {!validContact && (
                      <div className="invalid-feedback">{contactError}</div>
                    )}
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingPassword"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                    <label for="floatingPassword">Email Address</label>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <br></br>
                  <div class="d-grid">
                    <button
                      class="btn btn-outline-dark btn-login text-uppercase fw-bold"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};
