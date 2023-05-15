import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9020/api/students/forgot", { email });
      if (response.status === 200) {
        navigate("/enterotp", { state: { email } });
      }
    } catch (error) {
      console.log(error);
      alert("User Not found")
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div
            className="card border-0 shadow rounded-3 my-5"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                <button
                  className="btn btn-link"
                  onClick={() => navigate("/Student")}
                >
                  <i className="bi bi-skip-backward-fill"></i>
                </button>
                &nbsp;&nbsp;&nbsp;Reset Password Here...{" "}
                <i className="bi bi-envelope-at"></i>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter your Email here....."
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>

                <br></br>
                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
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
