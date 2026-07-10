const express = require("express");
const router = express.Router();

const authentication = require("../security/authentication.security");

// http://localhost:8080/auth/register
router.post("/register", authentication.registerUser);
// http://localhost:8080/auth/login
router.post("/login", authentication.loginUser);

module.exports = router;