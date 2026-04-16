import express from "express";
import multer from "multer";
import {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

// upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// routes
router.post("/", upload.single("photo"), addStudent);
router.get("/", getStudents);
router.get("/:id", getStudent);
router.put("/:id", upload.single("photo"), updateStudent); 
router.delete("/:id", deleteStudent);

export default router;