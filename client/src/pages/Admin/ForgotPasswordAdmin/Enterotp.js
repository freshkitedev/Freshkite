import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

export function EnterotpAm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const location = useLocation();
  const email = location.state && location.state.email ? location.state.email : "";

  const inputsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleOnChange = (index, event) => {
    const { value } = event.target;
    if (isNaN(value)) return false;
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    if (value) {
      if (index === 5) {
        inputsRef[5].current.blur();
      } else {
        inputsRef[index + 1].current.focus();
      }
    }
  };

  const handleOnKeyDown = (index, event) => {
    const { keyCode } = event;
    if (keyCode === 8 && !otp[index] && index !== 0) {
      inputsRef[index - 1].current.focus();
      const otpCopy = [...otp];
      otpCopy[index - 1] = "";
      setOtp(otpCopy);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log(enteredOtp, email)
    // submit the entered OTP to the server
    axios
      .post("http://localhost:9020/api/admin/otpverification", { otp: enteredOtp, email })
      .then(response => {
        // Handle successful response from the server
        console.log("OTP verification success:", response.data);
        navigate("/Newpasscodeam", { state: { email } });
      })
      .catch(error => {
        // Handle error response from the server
        console.log("OTP verification error:", error.response.data);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card border-0 shadow p-5">
        <h5 className="card-title mb-0">
          <Link to="/forgotpassword">
            <i className="bi bi-skip-backward-fill"></i>
          </Link>
          &nbsp;&nbsp;OTP verification{" "}
        </h5>
        <span className="mobile-text">
          Enter the code we just sent on your Email
        </span>
        <div className="d-flex flex-row mt-5">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              className="form-control mx-2"
              style={{ width: "70px" }}
              value={value}
              autoFocus={index === 0}
              onChange={(event) => handleOnChange(index, event)}
              onKeyDown={(event) => handleOnKeyDown(index, event)}
              ref={inputsRef[index]}
            />
          ))}
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <span className="d-block mobile-text mt-3">
            Didn't receive the code?
          </span>
          <span className="font-weight-bold text-primary cursor">Resend</span>
        </div>
      </div>
    </div>
  );
}
