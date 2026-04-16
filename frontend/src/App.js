import "./App.css";

import React, { useEffect, useState } from "react";
import api from "./api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadStudents = async () => {
    const res = await api.get("/");
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Management System</h1>

      <StudentForm
        refresh={loadStudents}
        editData={editData}
        setEditData={setEditData}
      />

      <hr />

      <StudentList
        students={students}
        refresh={loadStudents}
        setEditData={setEditData}
      />
    </div>
  );
}

export default App;