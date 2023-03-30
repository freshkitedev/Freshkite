import react from "react"
import "./Studentlist.css"
const Dashboard = ()=>{
    return (<body>
        <div class="sidebar">
        <a class="active" href="#home" >Dashboard</a>
        <a href="/payfee">Pay Fee</a>
        <a href="/addStudent">Add Student</a>
        <a href="/addCourse">Course</a>
        <a href="/Addfee">Add Fees  </a>
      </div>
      <div class="content"><h1>Hello world</h1></div>
        
        </body>
    )
}

export default Dashboard