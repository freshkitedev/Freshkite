import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "./AddStudent.css";

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
        <img
          class="img-fluid"
          src="https://static.wixstatic.com/media/81b34d_d1ef6ebfe8f5483c8097e7905ab82bb2~mv2.jpg/v1/fill/w_600,h_192,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/freshkite_small.jpg"
          alt="none"
        ></img>
        <a href="/dashboard">
          Dashboard&nbsp;
          <i class="bi bi-speedometer2"></i>
        </a>
        <a href="/payfee">
          Pay Fee&nbsp;
          <i class="bi bi-credit-card"></i>
        </a>
        <a class="active" href="/addStudent">
          Add Student&nbsp;
          <i class="bi bi-person-add"></i>
        </a>
        <a href="/addCourse">
          Course&nbsp;
          <i class="bi bi-gear-wide-connected"></i>
        </a>
        <a href="/Addfee">
          Add Fees&nbsp; <i class="bi bi-plus-circle-dotted"></i>
        </a>
        <a href="/excel">
          Excel&nbsp;<i class="bi bi-file-earmark-spreadsheet"></i>
        </a>
        <a href="/">
          Logout &nbsp;
          <i class="bi bi-box-arrow-right"></i>
        </a>
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
                      <option selected value="BE">
                        {" "}
                        BE
                      </option>
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
