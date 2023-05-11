import { Link } from "react-router-dom";
import "./StudentLogin.css";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here, e.g. send request to backend API
    // If login is successful, navigate to student dashboard
    navigate("/studentdashboard");
  };


  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Student's Sign In{" "}
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
                    name="name"
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div id="reset" class="text-center text-md-end">
                  <Link to="/forgotpassword">
                    <small>Forgot Your Password</small>
                  </Link>
                </div>

                <br></br>

                <div class="d-grid">
                 
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit" 
                  >
                     Let's Go In
                  </button>
                </div>
                <br></br>
                <div class="d-flex justify-content-center">
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
