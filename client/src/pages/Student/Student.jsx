import React from "react";
import "./Student.css";
import { Link } from "react-router-dom";

const Student = () => {
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
              <form>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Course"
                  />
                  <label for="floatingPassword">Course</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="Number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Contact"
                  />
                  <label for="floatingPassword">Contact</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label for="floatingPassword">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="Password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="Password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label for="floatingPassword">Repeat password</label>
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <br></br>
                <div class="col-12 col-sm-6 col-lg-7 mx-auto text-center text-sm-start text-lg-end mt-4 mt-sm-0">
                  <h6>
                    Already Registered? <Link to ="/studentlogin">Login Here</Link>
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
