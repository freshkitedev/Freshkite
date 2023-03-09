import {BrowserRouter,Routes,Route}from "react-router-dom"

import Home from "./pages/Home/Home"
import Admin from "./pages/Admin/Admin"
import Student from "./pages/Student/Student"
import Adash from "./pages/ADashboard/ADashboard"
import  AddStudent  from "./pages/ADashboard/AddStudent"
import AddCourse from "./pages/ADashboard/AddCourse"




 
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/Student" element={<Student/>}/>
      <Route path="/dashboard" element={<Adash/>}/>
      <Route path="/addStudent" element={<AddStudent/>}/>
      <Route path="/addCourse" element={<AddCourse/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
 