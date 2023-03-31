import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./AddStudent.css";

export const AddStudent = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <a href="/dashboard">Dashboard</a>
        <a href="/payfee">Pay Fee</a>
        <a href="/addStudent" class="active">
          Add Student
        </a>

        <a href="/addCourse">Course</a>
        <a href="/Addfee">Add Fees </a>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-sm-3 col-md-7 col-lg-5 mx-auto ">
            <div
              class="card border-0 shadow rounded-4 my-4"
              style={{ background: "#2399d9", color: "#000000" }}
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
                  <div class="form-floating mb-2">
                    <select
                      type="text"
                      class="form-control form-select mb-3"
                      id="floatingPassword"
                      onChange={(e) => {
                        setCourse(e.target.value);
                      }}
                      value={course}
                      aria-label=".form-select-lg example"
                    >
                      <option selected value="BE"> BE</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="12th">12th</option>
                      <option value="BA">BA</option>
                    </select>

                    <label for="floatingPassword">Course</label>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingPassword"
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                      value={year}
                    />
                    <label for="floatingPassword">Year</label>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingPassword"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                    />
                    <label for="floatingPassword">Phone</label>
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
                  <div class="d-grid">
                    <button
                      class="btn btn-success btn-login text-uppercase fw-bold"
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
