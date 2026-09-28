const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");


// Middleware
app.use(express.json());

app.use(logger);


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management REST API is running"
    });
});


// Student routes
app.use("/students", studentRoutes);


// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});


// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});