import { useState, useEffect } from "react";
import * as React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import "./Studentlist.css";
import "./dashboard.css";

const Dashboard = () => {

  const [courseCounts, setCourseCounts] = useState([]);
  const [data, setData] = useState([]);
  const [sData, setsData] = useState([]);
  const [eachCourse, setEachCourse] = useState([]);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [showTable, setShowTable] = useState(false); // new state variable

  const EachStudent = async () => {
    try {
      const response = await axios.get("http://localhost:9020/api/students/course/count");
      const studentsCount = response.data;
      setCourseCounts(studentsCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAll();
    EachStudent();
    getsall();
  }, []);

  const getTotalStudentsCount = () => {
    let total = 0;
    courseCounts.forEach((course) => {
      total += course.count;
    });
    return total;
  };

  const getAll = () => {
    axios.get("http://localhost:9020/api/students/")
      .then((result) => {
        const students = result.data;
        setData(students);

        const unpaidStudents = students.filter((student) => student.balance !== 0);
        setUnpaidCount(unpaidStudents.length);
        setPaidCount(students.length - unpaidStudents.length);
      })
  }

  const getsall = () => {
    axios.get("http://localhost:9020/api/students/")
      .then((result) => {
        const s = result.data;
        setsData(s);

        const groupedStudentsByCourse = s.reduce((acc, student) => {
          if (!acc[student.course]) {
            acc[student.course] = [];
          }
          acc[student.course].push(student);
          return acc;
        }, {});

        // set state with each course and its corresponding students
        setEachCourse(groupedStudentsByCourse);
      });
  };

  const handleShowTable = () => {
    setShowTable(!showTable); // toggle showTable state
  };

  return (
    <body>
      <div className="sidebar">
        <img
          className="img-fluid"
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

        <div className="mt-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "lightgray", width: "", height: "100px", borderRadius: "30px" }}>
          <h2 className="mb-0" style={{ fontFamily: "cursive" }}>Number of Students per Course:</h2>
        </div><br></br>
        <ul className="list-group">
          {courseCounts.map((course) => (
            <li
              key={course._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <b>{course._id}</b>
              <span className="badge bg-primary rounded-pill">
                <b>{course.count}</b>
              </span>
            </li>
          ))}
        </ul><br></br>
        <div className="mt-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "lightskyblue", borderRadius: "80px", height: "80px" }}>
          <h2>Total Students:  <span className="badge bg-primary rounded-pill">{getTotalStudentsCount()}</span></h2>
        </div>

        <div className="row">
          <div className="col">
            {unpaidCount > 0 ? (
              <div className="mt-3  d-flex justify-content-center align-items-center" style={{ backgroundColor: "lightgray", height: "100px", borderRadius: "50px" }}>
                <h5 style={{ fontFamily: "cursive" }} className="text-center"><span className="badge bg-primary rounded-pill">{unpaidCount}</span> Student{unpaidCount > 1 ? "s are" : " is"} yet to pay the course fees.</h5>
              </div>
            ) : null}
          </div>
          <div className="col">
            {paidCount > 0 ? (
              <div className="mt-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "lightgray", height: "100px", borderRadius: "50px", fontFamily: "cursive" }}>
                <h5 style={{ fontFamily: "cursive" }} className="text-center"><span className="badge bg-primary rounded-pill">{paidCount}</span> Student{paidCount > 1 ? "s have" : " has"} paid the course fees.</h5>
              </div>
            ) : null}
          </div>
        </div>
        <br></br>
        <button className="btn btn-primary" onClick={handleShowTable}>{showTable ? 'Hide ' : 'Detailed View'}</button> {/* updated button */}
        <br></br>&nbsp; {showTable && ( // conditionally render the table
          <table class="table table-primary table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(eachCourse).map((course) => (
                <>
                  <tr className="table-success">
                    <td colSpan="5" style={{ fontWeight: "bold" }}>{course}</td>
                  </tr>
                  {eachCourse[course].map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.year}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </body>
  );
}

export default Dashboard;