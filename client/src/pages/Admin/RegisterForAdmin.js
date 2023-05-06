import { Link } from "react-router-dom";

const RegisterForAdmin = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Admin Registration Form{" "}
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
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Repeat password"
                  />
                  <label for="floatingPassword">Repeat Password</label>
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
                <div class="col-7 mx-auto">
                  <h6>
                    Already Registered? &nbsp;
                    <Link to="/Admin">Login here</Link>
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

export default RegisterForAdmin;
