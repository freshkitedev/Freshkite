import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForAdmin = () => {
  const [name, setName] = useState("");
  const [phone, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();




  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }


    

  
  const expectedSecretKey = "freshkite"; // Replace with your actual secret key
  if (secretKey !== expectedSecretKey) {
    setErrorMessage("Invalid Code");
    return;
  }
    axios
      .post("http://localhost:9020/api/admin/register", {
        name,
        email,
        phone,
        password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Successfully Registered");
        navigate("/Admin");

        // Navigate to login page or display success message
      })
      .catch((error) => {
        console.log(error);
        // Display error message to user
        alert("Error, Try Again");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Admin Registration Form{" "}
                <Link to="/">
                  <i className="bi bi-house"></i>
                </Link>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name@example.com"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                    placeholder="Contact"
                    value={phone}
                    onChange={(event) => setContact(event.target.value)}
                  />
                  <label htmlFor="contact">Contact</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="secretKey"
                    placeholder="Registration Code"
                    value={secretKey}
                    onChange={(event) => setSecretKey(event.target.value)}
                  />
                  <label htmlFor="secretKey">Registration Code</label>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}           
                
                 <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                  <label htmlFor="confirmPassword">Repeat Password</label>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <br />
                <div className="d-flex justify-content-center">
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
  )}
export default RegisterForAdmin