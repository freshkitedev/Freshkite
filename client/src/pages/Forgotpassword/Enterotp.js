import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Enterotp() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOnChange = (index, event) => {
    const { value } = event.target;
    if (isNaN(value)) return false;
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    if (value) {
      if (index === 3) {
        inputsRef[3].current.blur();
      } else {
        inputsRef[index + 1].current.focus();
      }
    }
  };

  const handleOnKeyDown = (index, event) => {
    const { keyCode } = event;
    if (keyCode === 8 && !otp[index] && index !== 3) {
      inputsRef[index - 1].current.focus();
      const otpCopy = [...otp];
      otpCopy[index - 1] = "";
      setOtp(otpCopy);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    // submit the entered OTP to the server
    console.log("Entered OTP:", enteredOtp);
    navigate("/Newpasscode");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card border-0 shadow p-5">
        <h5 className="card-title mb-0">
          <Link to="/forgotpassword">
            <i class="bi bi-skip-backward-fill"></i>
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
