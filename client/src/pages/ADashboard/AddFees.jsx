import React, { useEffect, useState } from "react";
import  "bootstrap"
import axios from "axios"
import "./Studentlist.css"


const AddFee = ()=>{
      const [data,setData] = useState([]);
      const [totalfee,settotfee] = useState("");
      const [year,setyear] = useState("");
      const [coursename,setcoursename] = useState("");
      
      useEffect(()=>{
       getAll()
      },[])

      const getAll = ()=>{
        axios.get("http://localhost:9020/api/fees").then((result)=>{
            console.log(result);  
          setData( result.data)
       
        })
      }
      
    const del = async(items)=>{
       await axios.delete(`http://localhost:9020/api/courses/${items._id}`)
       getAll()
      
    }
    const handleSubmit = ()=>{
     
      const setdata = {
        totalFees:totalfee,
        year: year,
        CourseName: coursename
      }
      axios.post("http://localhost:9020/api/fees",setdata).then(()=>{
        getAll()

      })
    }

  
    return(
      <body>
      <div class="sidebar">
      
      <a  href="/dashboard">Dashboard</a>
      <a href="/payfee">Pay Fee</a>
      <a href="/addStudent">Add Student</a>
      <a href="/addCourse" >Course</a>
      <a href="/Addfee" class="active">Add Fees  </a>
    </div>
    
       <div className="content">
        <div className="row">
          
          <div className="col-5">
          <form onSubmit={handleSubmit}>
          <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
          <div class="card border-0 shadow rounded-4 my-4">
            <div class="card-body p-4 p-sm-4">
              
                <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">Add Fee</h5>
                <div class="form-floating mb-2">
                  <input type="text" class="form-control" id="floatingInput" 
                  name = "name" onChange={(e)=>{setcoursename(e.target.value)}} 
                  /> 
                  <label for="floatingInput">Course Name</label>
                </div>
                <div class="form-floating mb-2">
                  <input type="number" class="form-control" id="floatingPassword" 
                   name = "password" onChange={(e)=>{settotfee(e.target.value)}} value = {totalfee}
                  />
                  <label for="floatingPassword">Total Fee</label>
                </div>
                <div class="form-floating mb-4">
                  <input type="textbox" class="form-control" id="floatingPassword" 
                   name = "password" onChange={(e)=>{setyear(e.target.value)}} value = {year}
                  />
                  <label for="floatingPassword">Year</label>
                </div>
                <div class="d-grid">
                <button class="btn btn-success btn-login text-uppercase fw-bold" type="submit"
                
                >Create Fee</button>
              </div>
              
            </div>
          </div>
        </div>
            </form>
           </div>

            
          
          <div className="col-7">
          <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-success">Available Fees</h5>
          <table className="table table-bordered mt-3 table-hover" >
       <thead>
        <tr className="table-active">
        <th>S.No</th>
        <th>Course</th>
        <th>Year</th>
        <th>Total Fees</th>
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
             <td>{items.CourseName}</td>
            <td>{items.year} </td>
            <td>{items.totalFees}</td>
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

export default AddFee;