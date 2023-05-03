import react from "react";
import "./Studentlist.css";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <body>
      <div class="sidebar">
        <img
          class="img-fluid"
          src="https://static.wixstatic.com/media/81b34d_d1ef6ebfe8f5483c8097e7905ab82bb2~mv2.jpg/v1/fill/w_600,h_192,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/freshkite_small.jpg"
          alt="none"
        ></img>
        <a class="active" href="/dashboard">
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
        <a href="/excel">
          Excel&nbsp;<i class="bi bi-file-earmark-spreadsheet"></i>
        </a>
        <a href="/">
          Logout &nbsp;
          <i class="bi bi-box-arrow-right"></i>
        </a>
      </div>
      <div class="content">
        <div class="main align-content-center">
          <div class="circle">22</div>
        </div>
      </div>
    </body>
  );
};

export default Dashboard;
