import Student from "../models/Student.js";

// Generate Admission Number
const generateAdmissionNo = async () => {
  const count = await Student.countDocuments();
  return "ADM" + String(count + 1).padStart(4, "0");
};

export const addStudent = async (req, res) => {
  try {
    const admissionNo = await generateAdmissionNo();

    const student = new Student({
      admissionNo,
      ...req.body,
      photo: req.file ? req.file.filename : null
    });

    await student.save();
    res.json(student);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const data = await Student.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const data = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};