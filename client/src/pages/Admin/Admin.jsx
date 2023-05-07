import React, { useState } from "react";
import axios from "axios";

import "./Admin.css";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const [name, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const redirect = () => {
    navigate("/dashboard");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      password: password,
    };

    axios
      .post("http://localhost:9020/api/admin/login", data)
      .then((result) => {
        if (result.data.isAdmin) {
          redirect();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Admin's Sign In{" "}
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
                    name="name"
                    value={name}
                    onChange={(e) => setuser(e.target.value)}
                  />
                  <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3 input-group ">
                  <input
                    type={showPassword ? "text" : "password"}
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      class={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </button>
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="d-flex justify-content-end">
                  <Link to="/forgotpassword">Forgot Your Password</Link>
                </div>

                <br></br>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Sign in
                  </button>
                </div>

                <br></br>
                <div class="col-12 col-md-7 mx-auto text-center text-md-end">
                  <h6 class="mb-0">
                    Not an admin?&nbsp;&nbsp;
                    <Link to="/registerforadmin">Register Here</Link>
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
export default Admin;
