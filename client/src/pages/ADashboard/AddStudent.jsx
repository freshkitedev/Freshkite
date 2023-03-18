import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import "./AddStudent.css";

export const AddStudent = () => {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("name is required").matches(/^[A-Za-z]+$/, 'Name must not contain numbers'),
    course: yup.string().required("Course is required"),
    year: yup.number().positive().integer('Number must be an integer').required(),
    phone: yup.number().required().integer('Number must be an integer').test('Number must be 10 digits', (val) => val.toString().length === 10).positive(),
    email: yup.string().email("Email is not valid").required("Email is required"),
    password: yup.string().required()
  })
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema) 
  });
  
  const onSubmit = (data) => {
    axios
      .post("http://localhost:9020/api/admin/createstudent", data)
      .then((result) => {
        navigate("/dashboard");
      })
      .catch((error)=>{
        alert(error.response.data.message)
      
      });
  };
  return (
    <body className="body">
      <div class="sidebar">
       <a href="/dashboard">Dashboard</a>
        <a href="/addStudent" class="active">
          Add Student
        </a>
        

        <a href="/addCourse">Course</a>
        <a href="#about">About</a>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-sm-3 col-md-7 col-lg-5 mx-auto " >
            <div class="card border-0 shadow rounded-4 my-4" style={{background:"#2399d9" ,color:"#000000"}}>
              <div class="card-body p-4 p-sm-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-floating mb-2">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      {...register("name")}
                    />
                    <label for="floatingInput">Name</label>
                    <p className="red">{errors.name?.message}</p>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingPassword"
                      {...register("course")}
                    />
                    <label for="floatingPassword">Course</label>
                    <p className="red">{errors.course?.message}</p>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingPassword"
                      {...register("year")}
                    />
                    <label for="floatingPassword">Year</label>
                    <p className="red">{errors.year?.message}</p>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingPassword"
                      {...register("phone")}
                    />
                    <label for="floatingPassword">Phone</label>
                    <p className="red">{errors.phone?.message}</p>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingPassword"
                      {...register("email")}
                    />
                    <label for="floatingPassword">Email Address</label>
                    <p className="red">{errors.email?.message}</p>
                  </div>
                  <div class="form-floating mb-2">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      {...register("password")}
                    />
                    <label for="floatingPassword">Password</label>
                    <p className="red">{errors.password?.message}</p>
                  </div>
                  <div class="d-grid">
                    <button
                      class="btn btn-success btn-login text-uppercase fw-bold"
                      type="submit"
                      
                    >
                      Create Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};
