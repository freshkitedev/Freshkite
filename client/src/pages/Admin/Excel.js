import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Excel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:9020/api/admin/upload",
        formData
      );
      console.log(res.data);
      setUploadSuccess(true);
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
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
      <div className="content ">
        <div className="d-flex justify-content-center align-items-center vh-100 ">
          <div className="d-flex justify-content-center align-items-center ">
            <form
              onSubmit={onSubmit}
              className="d-flex justify-content-center align-items-center shadow"
              style={{
                borderRadius: "20px",
                backgroundColor: "lightblue",
                width: "550px",
                height: "100px",
              }}
            >
              <input type="file" onChange={onFileChange} />
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </form>{" "}
            {uploadSuccess && (
              <div className="text-primary">File uploaded successfully!</div>
            )}
            {errorMessage && <div className=" text-danger">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </body>
  );
}
