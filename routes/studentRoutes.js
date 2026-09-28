const express = require("express");
const router = express.Router();

let students = require("../data/students");

// GET /students
// Get all students
router.get("/", (req, res) => {
    try {
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// GET /students/:id
// Get student by ID
router.get("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// POST /students
// Add new student
router.post("/", (req, res) => {
    try {
        const { name, course, age } = req.body;

        if (!name || !course || age === undefined) {
            return res.status(400).json({
                message: "Name, course and age are required"
            });
        }

        const newStudent = {
            id: students.length > 0
                ? students[students.length - 1].id + 1
                : 1,
            name: name,
            course: course,
            age: age
        };

        students.push(newStudent);

        res.status(201).json({
            message: "Student created successfully",
            student: newStudent
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// PUT /students/:id
// Update student
router.put("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { name, course, age } = req.body;

        if (!name || !course || age === undefined) {
            return res.status(400).json({
                message: "Name, course and age are required"
            });
        }

        student.name = name;
        student.course = course;
        student.age = age;

        res.status(200).json({
            message: "Student updated successfully",
            student: student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// DELETE /students/:id
// Delete student
router.delete("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const deletedStudent = students.splice(index, 1);

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent[0]
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


module.exports = router;