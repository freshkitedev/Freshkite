import React, { useEffect, useState } from "react";
import "bootstrap";
import axios from "axios";
import "./Studentlist.css";
import { useNavigate } from "react-router-dom";

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
        <a href="/dashboard">
          Dashboard&nbsp;
          <i class="bi bi-speedometer2"></i>
        </a>
        <a class="active" href="/payfee">
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
