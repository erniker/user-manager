// Route for auth user
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Create an user
// api/auth
router.post(
  "/",
  [
    check("email", "A valid email is required").isEmail(),
    check(
      "password",
      "Please enter a password with at least 8 character and contain at least one uppercase, one lower case and one special character."
    ).isStrongPassword(),
  ],
  authController.userAuth
);

router.post("/login", authController.userAuth);

// Get authenticated user
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
