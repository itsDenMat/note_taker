// Required dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const apiRoutes = require("./routes/routes");

// Will initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup for data parsing JSON data
// Useful for API calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.get("/notes", (req, res) => {
    res.sendFile(path.join (__dirname, "/public/notes.html"))
});

// Listener 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  