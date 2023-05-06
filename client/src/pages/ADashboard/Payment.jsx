import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const values = location.state.items;
  console.log(values.phone);
  const [amntopay, setamnt] = useState();
  console.log(amntopay);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      amntopay: amntopay,
      _id: values._id,
    };
    axios
      .post("http://localhost:9020/api/pay/payfees/", data)
      .then((result) => {
        alert(
          "Payment SuccessFull You will be redirected to Dashboard in 5 seconds"
        );
        setTimeout(() => navigate("/dashboard"), 3000);
      });
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-3 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-4 my-4">
            <div class="card-body p-4 p-sm-4">
              <h1
                style={{ textAlign: "center" }}
                class="rounded bg-success text-white"
              >
                Payment
              </h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    value={values.name}
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingPassword"
                    value={values.course}
                  />
                  <label for="floatingPassword">Course</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingPassword"
                    value={values.year}
                  />
                  <label for="floatingPassword">Year</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingPassword"
                    value={values.phone}
                  />
                  <label for="floatingPassword">Phone</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingPassword"
                    value={values.email}
                  />
                  <label for="floatingPassword">Email Address</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingPassword"
                    onChange={(e) => setamnt(e.target.value)}
                    value={amntopay}
                  />
                  <label for="floatingPassword">Amount To Pay Rs.</label>
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-success btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Pay Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
