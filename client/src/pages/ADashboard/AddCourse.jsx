import React, { useEffect, useState } from "react";
import  "bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import "./ADashboard.css";


const AddCourse = ()=>{
      const [dataa,setDataa] = useState([]);
      
      useEffect(()=>{
       getAll()
      },[])

      const schema = yup.object().shape({
        course: yup.string().required("course is required"),
        duration: yup.number().min(1).max(3).positive().integer('Number must be an integer').required(),
        description: yup.string().required(),
        
      })
      const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema) 
      });
      


      const getAll = ()=>{
        axios.get("http://localhost:9020/api/courses").then((result)=>{  
          setDataa( result.data)
       
        })
      }
      
    const del = async(items)=>{
       await axios.delete(`http://localhost:9020/api/courses/${items._id}`)
       getAll()
      
    }
    const onSubmit = (data)=>{
     
      axios.post("http://localhost:9020/api/courses",data).then(()=>{
        getAll()
       
      })
    }

  
    return(
      <body>
      <div class="sidebar">
       
      <a  href="/dashboard">Dashboard</a>
      <a href="/addStudent">Add Student</a>
      <a href="/addCourse" class="active">Course</a>
      <a href="#about">About</a>
    </div>
    
       <div className="content">
        <div className="row">
          
          <div className="col-5">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
          <div class="card border-0 shadow rounded-4 my-4">
            <div class="card-body p-4 p-sm-4">
              
                <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">New Course</h5>
                <div class="form-floating mb-2">
                  <input type="text" class="form-control" id="floatingInput" 
                  name = "name" {...register("course")}
                  /> 
                  <label for="floatingInput">Course</label>
                  <p className="red">{errors.course?.message}</p>
                </div>
                <div class="form-floating mb-2">
                  <input type="number" class="form-control" id="floatingPassword" 
                   name = "password" {...register("duration")}
                  />
                  <label for="floatingPassword">Duration</label>
                  <p className="red">{errors.duration?.message}</p>
                </div>
                <div class="form-floating mb-4">
                  <input type="textbox" class="form-control" id="floatingPassword" 
                   name = "password" {...register("description")}
                  />
                  <label for="floatingPassword">Description</label>
                  <p className="red">{errors.description?.message}</p>
                </div>
                <div class="d-grid">
                <button class="btn btn-success btn-login text-uppercase fw-bold" type="submit"
                
                >Create Course</button>
              </div>
              
            </div>
          </div>
        </div>
            </form>
           </div>

            
          
          <div className="col-7">
          <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-success">Available Courses</h5>
          <table className="table table-bordered mt-3 table-hover" >
       <thead>
        <tr className="table-active">
        <th>S.No</th>
        <th>Course</th>
        <th>Duration</th>
        <th>Description</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
  

   {
        dataa.length > 0 ? 
        (
            dataa.map((items,index)=> 
            <tr key={items._id} >
            <td>{index + 1}</td>
             <td>{items.course}</td>
            <td>{items.duration} Years</td>
            <td>{items.description}</td>
            <td><button type = "button"className="btn btn-danger" onClick={()=>del(items)}>Delete</button></td>
           </tr>
          )
           
        )
        :
        (
            <tr>No Data</tr>
        )        
      }
    </tbody>
  </table>
    </div> </div> </div>  </body>  
    )
}

export default AddCourse;