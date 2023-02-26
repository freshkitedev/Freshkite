import React, { useEffect, useState } from "react";
import  "bootstrap"
import axios from "axios"
import "./ADashboard.css"


const Adash = ()=>{
      const [data,setData] = useState([]);
      
      useEffect(()=>{
       getAll()
      },[])

      const getAll = ()=>{
        axios.get("http://localhost:9020/api/students/").then((result)=>{  
          setData(result.data)
        })
      }
      
    const del = async(items)=>{
       await axios.delete(`http://localhost:9020/api/students/${items._id}`)
       getAll()
      
    }
    

  
    return(
      <body>
      <div class="sidebar">

      <a class="active" href="#home">Dashboard</a>
      <a href="/addStudent">Add Student</a>
      <a href="/addCourse">Course</a>
      <a href="#about">About</a>
    </div>
    
        <div class="content">
        <div className="row">
          <div className="col-12">
          <table className="table table-light">
       <thead>
        <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Course</th>
        <th>Email</th>
        <th>Year</th>
        <th>Phone</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
  

   {
        data.length > 0 ? 
        (
            data.map((items,index)=> 
            <tr key={items._id}>
            <td>{index + 1}</td>
            <td>{items.name}</td>
             <td>{items.course}</td>
            <td>{items.email}</td>
            <td>{items.year}</td>
            <td>{items.phone}</td>
            <td><button type="button"className="btn btn-success">Update</button></td>
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
    </div> </div> </div> </body>
       
    )
}

export default Adash;