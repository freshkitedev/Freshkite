import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const StudentLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9020/api/students/login",
        {
          name,
          password,
        }
      );
      const { token} = response.data;
      localStorage.setItem("token", token);
      
      navigate("/studentdashboard");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("Network error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Student's Sign In{" "}
                <Link to="/">
                  <i className="bi bi-house"></i>
                </Link>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div id="reset" className="text-center text-md-end">
                  <Link to="/forgotpassword">
                    <small>Forgot Your Password</small>
                  </Link>
                </div>

                <br />

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Let's Go In
                  </button>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <h6>
                    &nbsp;&nbsp;Not Registered yet?&nbsp;&nbsp;
                    <Link to="/Student">Register Here</Link>
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

export default StudentLogin;
