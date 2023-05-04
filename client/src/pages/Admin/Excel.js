import React, { useState } from "react";

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
        <a href="/dashboard">
          Dashboard&nbsp;
          <i class="bi bi-speedometer2"></i>
        </a>
        <a href="/payfee">
          Pay Fee&nbsp;
          <i class="bi bi-credit-card"></i>
        </a>
        <a href="/addStudent">
          Add Student&nbsp;
          <i class="bi bi-person-add"></i>
        </a>
        <a href="/addCourse">
          Course&nbsp;
          <i class="bi bi-gear-wide-connected"></i>
        </a>
        <a href="/Addfee">
          Add Fees&nbsp; <i class="bi bi-plus-circle-dotted"></i>
        </a>
        <a class="active" href="/excel">
          Excel&nbsp;<i class="bi bi-file-earmark-spreadsheet"></i>
        </a>
        <a href="/">
          Logout &nbsp;
          <i class="bi bi-box-arrow-right"></i>
        </a>
      </div>

      <div className="vh-100 d-flex justify-content-center align-items-center ms-3">
        <div className="text-center">
          <input type="file" />
        </div>
      </div>
    </>
  );
};
