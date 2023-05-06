import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Forgotpassword = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/enterotp");
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div
            class="card border-0 shadow rounded-3 my-5  "
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                <Link to="/Admin">
                  <i class="bi bi-skip-backward-fill"></i>
                </Link>
                &nbsp;&nbsp;&nbsp;Reset Password Here...{" "}
                <i class="bi bi-envelope-at"></i>
              </h5>
              <form>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Enter your Email here....."
                    name="name"
                  />
                  <label for="floatingInput">Email</label>
                </div>

                <br></br>
                <div class="d-grid">
                  <button
                    class="btn btn-outline-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Send OTP
                  </button>
                </div>

                <br></br>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
