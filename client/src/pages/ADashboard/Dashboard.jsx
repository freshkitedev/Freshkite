import React from "react";
import "./Studentlist.css";
import "./dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";



const Dashboard = () => {
  const [studentsCount, setStudentsCount] = useState(0);


  useEffect(() => {
    const getStudentsCount = async () => {
      try {
        const response = await axios.get("http://localhost:9020/api/students/courses/count");
        setStudentsCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    getStudentsCount();
  }, []);

  return (
    <body>
      <div class="sidebar">
        <img
          class="img-fluid"
          src="https://static.wixstatic.com/media/81b34d_d1ef6ebfe8f5483c8097e7905ab82bb2~mv2.jpg/v1/fill/w_600,h_192,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/freshkite_small.jpg"
          alt="none"
        ></img>
        <Link className="active" to="/dashboard">
          Dashboard&nbsp;
          <i className="bi bi-speedometer2"></i>
        </Link>
        <Link to="/payfee">
          Pay Fee&nbsp;
          <i className="bi bi-credit-card"></i>
        </Link>
        <Link to="/addStudent">
          Add Student&nbsp;
          <i className="bi bi-person-add"></i>
        </Link>
        <Link to="/addCourse">
          Course&nbsp;
          <i className="bi bi-gear-wide-connected"></i>
        </Link>
        <Link to="/Addfee">
          Add Fees&nbsp; <i className="bi bi-plus-circle-dotted"></i>
        </Link>
        <Link to="/excel">
          Excel&nbsp;<i className="bi bi-file-earmark-spreadsheet"></i>
        </Link>
        <Link to="/">
          Logout &nbsp;
          <i className="bi bi-box-arrow-right"></i>
        </Link>
      </div>
      <div className="content">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <h1
            className="d-flex justify-content-center align-items-center "
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              color: " lightblue",
              width: "550px",
              height: "100px",
            }}
          >
            Total No. of Students: {studentsCount}
          </h1>

          
        </div>
      </div>
    </body>
  );
};

export default Dashboard;
