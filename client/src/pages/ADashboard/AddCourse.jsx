import React, { useEffect, useState } from "react";
import  "bootstrap"
import axios from "axios"
import "./Studentlist.css"


const AddCourse = ()=>{
      const [data,setData] = useState([]);
      const [Course,setCourse] = useState("");
      const [Duration,setDuration] = useState("");
      const [Description,setDesc] = useState("");
      
      useEffect(()=>{
       getAll()
      },[])

      const getAll = ()=>{
        axios.get("http://localhost:9020/api/courses").then((result)=>{  
          setData( result.data)
       
        })
      }
      
    const del = async(items)=>{
       await axios.delete(`http://localhost:9020/api/courses/${items._id}`)
       getAll()
      
    }
    const handleSubmit = (e)=>{
     e.preventDefault()
      const setdata = {
        course:Course,
        duration: Duration,
        description: Description
      }
      axios.post("http://localhost:9020/api/courses",setdata).then(()=>{
        getAll()
      }).catch((err)=>{
        console.log(err);
      })
    }

  
    return(
      <body>
      <div class="sidebar">
       
      <a  href="/dashboard">Dashboard</a>
      <a href="/payfee">Pay Fee</a>
      <a href="/addStudent">Add Student</a>
      <a href="/addCourse" class="active">Course</a>
      <a href="/Addfee">Add Fees  </a>
    </div>
    
       <div className="content">
        <div className="row">
          
          <div className="col-5">
          <form onSubmit={(e)=>handleSubmit(e)}>
          <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
          <div class="card border-0 shadow rounded-4 my-4">
            <div class="card-body p-4 p-sm-4">
              
                <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">New Course</h5>
                <div class="form-floating mb-2">
                  <input type="text" class="form-control" id="floatingInput" 
                  name = "name" onChange={(e)=>{setCourse(e.target.value)}} value = {Course}
                  /> 
                  <label for="floatingInput">Course</label>
                </div>
                <div class="form-floating mb-2">
                  <input type="number" class="form-control" id="floatingPassword" 
                   name = "password" onChange={(e)=>{setDuration(e.target.value)}} value = {Duration}
                  />
                  <label for="floatingPassword">Duration</label>
                </div>
                <div class="form-floating mb-4">
                  <input type="textbox" class="form-control" id="floatingPassword" 
                   name = "password" onChange={(e)=>{setDesc(e.target.value)}} value = {Description}
                  />
                  <label for="floatingPassword">Description</label>
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
        data.length > 0 ? 
        (
            data.map((items,index)=> 
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