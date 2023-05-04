import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const Adminnav = () => {
    navigate("/Admin");
  };
  const Studentnav = () => {
    navigate("/Student");
  };
  return (
    <body>
      <div className="vh-100 d-flex justify-content-center align-items-center ms-3">
        <button
          type="button"
          class="btn btn-outline-primary btn-lg  m-3 mt-5 "
          onClick={Adminnav}
        >
          Admin&nbsp;
          <i class="bi bi-person-circle"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary  btn-lg  m-3 mt-5"
          onClick={Studentnav}
        >
          Student&nbsp;
          <i class="bi bi-book-half"></i>
        </button>
      </div>
    </body>
  );
};
export default Home;
