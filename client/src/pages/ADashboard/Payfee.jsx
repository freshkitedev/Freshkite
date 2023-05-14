import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Studentlist.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Adash = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  const navigate = useNavigate();

  const getAll = () => {
    axios.get("http://localhost:9020/api/students/").then((result) => {
      setData(result.data);
    });
  };

  const del = async (items) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you Sure to delete ${items.name}`) === true) {
      await axios.delete(`http://localhost:9020/api/students/${items._id}`);
      getAll();
    }
  };
  const payfee = async (items) => {
    console.log(items);
    navigate("/paymentPage", { state: { items } });
  };

  return (
    <body>
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
        <Link className="active" to="/payfee">
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
      <div class="content">
        <div className="row">
          <div className="col-12">
            <br></br>
            <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-6">
                <div class="form">
                  <input
                    type="text"
                    class="form-control form-input"
                    placeholder="Search by Name..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <br></br>
            <table className="table table-light ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th>Balance(Rs.)</th>
                  <th>Payfee</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
  {data.length > 0 ? (
    data
      .filter((value) => {
        if (search === "") {
          return value;
        } else if (
          value.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        }
      })
      .filter((value) => value.balance !== 0)
      .map((items, index) => (
        <tr key={items._id}>
          <td>{index + 1}</td>
          <td>{items.name}</td>
          <td>{items.course}</td>
          <td>{items.email}</td>
          <td>{items.year}</td>
          <td>{items.phone}</td>
          <td>{items.balance}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => payfee(items)}
            >
              Payfee
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => del(items)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
  ) : (
    <tr>No Data</tr>
  )}
</tbody>

            </table>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </body>
  );
};

export default Adash;
