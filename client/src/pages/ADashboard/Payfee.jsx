import React, { useEffect, useState } from "react";
import  "bootstrap"
import axios from "axios"
import "./Studentlist.css"
import { useNavigate } from "react-router-dom";


const Adash = ()=>{
      const [data,setData] = useState([]);
      const [search,setSearch] = useState("");
      
      useEffect(()=>{ 
       getAll()
      },[])

      const navigate =useNavigate()
   
      const getAll = ()=>{
        axios.get("http://localhost:9020/api/students/").then((result)=>{  
          setData(result.data)
        })
      }
      
    const del = async(items)=>{
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you Sure to delete ${items.name}`) === true){
       await axios.delete(`http://localhost:9020/api/students/${items._id}`)
       getAll()
      }
    }
    const payfee = async(items)=>{
      console.log(items);
      navigate("/paymentPage",{state:{items}})

    }
  
    return(
      <body>
      <div class="sidebar">
      <a href="/dashboard" >Dashboard</a>
      <a class="active" href="#home">Pay Fee</a>
      <a href="/addStudent">Add Student</a>
      <a href="/addCourse">Course</a>
      <a href="/Addfee">Add Fees  </a>
    </div>
    
        <div class="content">
        <div className="row">
          <div className="col-12">
          <input 
      className="search-box" 
      type="text" 
      placeholder="Search...." 
      onChange={(event) => {setSearch(event.target.value)}} />
          <table className="table table-light">
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
  

   {
        data.length > 0 ? 
        (
          data.filter((value) => {
            if (search === "") {
              return value;
            } else if (value.name.toLowerCase().includes(search.toLowerCase()) || value.course.toLowerCase().includes(search.toLowerCase())) {
              return value;
            }
          }).map((items,index)=> 
            <tr key={items._id}>
            <td>{index + 1}</td>
            <td>{items.name}</td>
             <td>{items.course}</td>
            <td>{items.email}</td>
            <td>{items.year}</td>
            <td>{items.phone}</td>
            <td>{items.balance}</td>
            <td><button type="button"className="btn btn-success" onClick={()=>payfee(items)}>Payfee</button></td>
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