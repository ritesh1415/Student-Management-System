import React, { useEffect, useState } from "react";
import api from "../api";

export default function StudentForm({ refresh, editData, setEditData }) {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        dob: editData.dob ? editData.dob.substring(0, 10) : ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (photo) data.append("photo", photo);

    if (editData) {
      await api.put(`/${editData._id}`, data);
      setEditData(null);
    } else {
      await api.post("/", data);
    }

    setForm({});
    setPhoto(null);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editData ? "Edit Student" : "Add Student"}</h2>

      <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
      <input name="course" placeholder="Course" value={form.course || ""} onChange={handleChange} />
      <input name="year" placeholder="Year" value={form.year || ""} onChange={handleChange} />

      <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} />

      <select name="gender" value={form.gender || ""} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" value={form.mobile || ""} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address || ""} onChange={handleChange} />

      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

      <button type="submit">
        {editData ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}