import React, { useEffect, useState} from "react";
import axios from "axios"
import Student from "../Student/Student"
import "./Admin.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Admin = (props) => {
    const [name,setuser] = useState("")
    const [password,setpassword] = useState("");

    const navigate = useNavigate();
    const redirect = ()=>{
      navigate("/dashboard")
    }
    const handleSubmit = (e)=>{
    e.preventDefault();
       const data = {
        name:name,
        password:password
       }
      
      axios.post("http://localhost:9020/api/admin/login",data)
      .then((result) => {
         if (result.data.isAdmin) {
          redirect()
         }
      })
      .catch((error) => { 
        alert(error.response.data.message)
        console.log(error);
      });

    } 
  return (
    
   
    <div class="container">
      
    <div class="row">
   
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"
                name = "name" value= {name} onChange = {(e)=>setuser(e.target.value)}
                /> 
                <label for="floatingInput">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                 name = "password" value={password} onChange = {(e)=>setpassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit"
                 onClick={(e)=>handleSubmit(e)}
                
                >Sign
                  in</button>
              </div>
              
        
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};
export default Admin;
