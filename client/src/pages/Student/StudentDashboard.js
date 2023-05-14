import { useState, useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";


const StudentDashboard = () => {
  const [studentDetails, setStudentDetails] = useState({});
  const token = localStorage.getItem("token");
  //const studentId = JSON.parse(localStorage.getItem("studentId")); // Retrieve student ID from localStorage and parse it as JSON
  const { decodedToken } = useJwt(token);

  const navigate = useNavigate();

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9020/api/students/${decodedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentDetails(response.data.details);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchStudentDetails();
    }
  }, [decodedToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    navigate("/studentlogin");
  };

  const payFee = () => {
    navigate("/payment");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "" }}>
      <div className="  text-center p-5" style={{backgroundColor:"lightblue", borderRadius:"40px" , marginTop:"150px"}}>
        <h1>Welcome <b>{studentDetails.name}!</b></h1>
        <p>Your email is <b>{studentDetails.email}</b>. </p>
        <p>You are currently taking the course <b>{studentDetails.course}</b>. </p>
        <p>Balance Fees to Pay For the Course <b>{studentDetails.balance}</b>.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={payFee}>
            Pay Fee
          </button>&nbsp;
          <button className="btn btn-danger " onClick={handleLogout}>
            Logout
          </button>
        </div>
     </div>
     </div>
  );
};

export default StudentDashboard;
