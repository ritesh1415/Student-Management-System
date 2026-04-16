import React, { useState } from "react";
import api from "../api";

export default function StudentList({ students, refresh, setEditData }) {
  const [viewStudent, setViewStudent] = useState(null);

  const deleteStudent = async (id) => {
    await api.delete(`/${id}`);
    refresh();
  };

  return (
    <div>
      <h2>Student List</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Admission No</th>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>
                {s.photo && (
                  <img
                    src={`http://localhost:5000/uploads/${s.photo}`}
                    width="60"
                    alt=""
                  />
                )}
              </td>

              <td>{s.admissionNo}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.year}</td>
              <td>{s.gender}</td>
              <td>{s.email}</td>

              <td>
                <button onClick={() => setViewStudent(s)}>View</button>
                <button onClick={() => setEditData(s)}>Edit</button>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      {viewStudent && (
        <div style={{
          position: "fixed",
          top: "20%",
          left: "30%",
          background: "#fff",
          padding: "20px",
          border: "1px solid black"
        }}>
          <h3>Student Details</h3>

          <p><b>Name:</b> {viewStudent.name}</p>
          <p><b>Course:</b> {viewStudent.course}</p>
          <p><b>Year:</b> {viewStudent.year}</p>
          <p><b>DOB:</b> {viewStudent.dob?.substring(0, 10)}</p>
          <p><b>Gender:</b> {viewStudent.gender}</p>
          <p><b>Email:</b> {viewStudent.email}</p>
          <p><b>Mobile:</b> {viewStudent.mobile}</p>
          <p><b>Address:</b> {viewStudent.address}</p>

          <button onClick={() => setViewStudent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}