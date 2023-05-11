import { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentRes = await axios.get(`/api/students/${studentId}`);
        setStudent(studentRes.data);

        // Fetch courses for the student
        const coursesRes = await axios.get(`/api/students/${studentId}/courses`);
        setCourses(coursesRes.data);

        // Fetch payments for the student
        const paymentsRes = await axios.get(`/api/students/${studentId}/payments`);
        setPayments(paymentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [studentId]);

  // Calculate the total fees for all courses
  const totalFees = courses.reduce((acc, course) => acc + course.fees, 0);

  // Calculate the total payments made by the student
  const totalPayments = payments.reduce((acc, payment) => acc + payment.amount, 0);

  // Calculate the remaining balance
  const remainingBalance = totalFees - totalPayments;

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{student.name}'s Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.name} - {course.fees}
          </li>
        ))}
      </ul>
      <h2>Payments</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment._id}>
            {payment.amount} paid on {new Date(payment.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <h2>Summary</h2>
      <p>Total Fees: {totalFees}</p>
      <p>Total Payments: {totalPayments}</p>
      <p>Remaining Balance: {remainingBalance}</p>
    </div>
  );
};

export default StudentDashboard;
