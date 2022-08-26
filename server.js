// Required dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Will initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup for data parsing
// Useful for API calls
app.use(express.urlencoded({extemded: true}));
app.use(express.json());
app.use(express.static(__dirname));