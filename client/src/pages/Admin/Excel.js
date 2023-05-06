import React from "react";
import { Link } from "react-router-dom";
import "../ADashboard/Studentlist.css";

export const Excel = () => {
  return (
    <>
      <div class="sidebar">
        <img
          class="img-fluid"
          src="https://static.wixstatic.com/media/81b34d_d1ef6ebfe8f5483c8097e7905ab82bb2~mv2.jpg/v1/fill/w_600,h_192,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/freshkite_small.jpg"
          alt="none"
        ></img>
        <Link to="/dashboard">
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
        <Link className="active" to="/excel">
          Excel&nbsp;<i className="bi bi-file-earmark-spreadsheet"></i>
        </Link>
        <Link to="/">
          Logout &nbsp;
          <i className="bi bi-box-arrow-right"></i>
        </Link>
      </div>

      <div className="vh-100 d-flex justify-content-center align-items-center ms-3">
        <div className="text-center">
          <input type="file" />
        </div>
      </div>
    </>
  );
};
