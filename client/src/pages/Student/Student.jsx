import React from "react";
import "./Student.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

const Student = () => {
  
  const schema = yup.object().shape({
    name: yup.string().required("name is required").matches(/^[A-Za-z]+$/, 'Name must not contain numbers'),
    course: yup.string().required("Course is required"),
    contact: yup.number().required().integer('Number must be an integer').test('Number must be 10 digits', (val) => val.toString().length === 10),
    email: yup.string().email("Email is not valid").required("Email is required")
  })
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema) 
  });
  const onSubmit = (data)=> {
      console.log(data);
  }

  
  return (
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Student Registration Form</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" {...register("name")}/>
                <label for="floatingInput">Name</label>
                <p className="red">{errors.name?.message}</p>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Course" {...register("course")}/>
                <label for="floatingPassword">Course</label>
                <p className="red">{errors.course?.message}</p>
              </div>
              <div class="form-floating mb-3">
                <input type="Number" class="form-control" id="floatingInput" placeholder="Contact" {...register("contact")}/>
                <label for="floatingPassword">Contact</label>
                <p className="red">{errors.contact?.message}</p>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Email" {...register("email")}/>
                <label for="floatingPassword">Email</label>
                <p className="red">{errors.email?.message}</p>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register
                  </button>
              </div>
              
        
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};
export default Student;
