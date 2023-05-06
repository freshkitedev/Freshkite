import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Student from "./pages/Student/Student";
import Dashboard from "./pages/ADashboard/Dashboard";
import Adash from "./pages/ADashboard/Payfee";
import { AddStudent } from "./pages/ADashboard/AddStudent";
import AddCourse from "./pages/ADashboard/AddCourse";
import Payment from "./pages/ADashboard/Payment";
import AddFee from "./pages/ADashboard/AddFees";
import RegisterForAdmin from "./pages/Admin/RegisterForAdmin";
import StudentLogin from "./pages/Student/StudentLogin";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Excel } from "./pages/Admin/Excel";
import { Forgotpassword } from "./pages/Forgotpassword/Forgotpassword";
import { Enterotp } from "./pages/Forgotpassword/Enterotp";
import { NewPassword } from "./pages/Forgotpassword/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payfee" element={<Adash />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/paymentPage" element={<Payment />} />
        <Route path="/Addfee" element={<AddFee />} />
        <Route path="/registerforadmin" element={<RegisterForAdmin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/excel" element={<Excel />} />
        <Route path="/forgotpassword" element={<Forgotpassword/>} />
        <Route path="/enterotp" element={<Enterotp/>} />
        <Route path="/Newpasscode" element={<NewPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
