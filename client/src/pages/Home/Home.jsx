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
      
      <div className="homebtn">
       
        <button type="button" class="btnhome " onClick={Adminnav}>
          Admin
        </button>
        <button type="button" class="btnhome " onClick={Studentnav}>
          Student
        </button>
      </div>
    </body>
  );
};
export default Home;
