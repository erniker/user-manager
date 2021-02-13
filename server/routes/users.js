// Route for creating user
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Create an user
// api/users
router.post(
  "/",
  [
    check("email", "A valid email is required").isEmail(),
    check(
      "password",
      "Please enter a password at least 8 character and contain At least one uppercase, one lower case and one special character."
    ).isStrongPassword(),
  ],
  userController.createUser
);

// Get all users
router.get("/", auth, userController.getUsers);

// Get User by Id
router.get("/:id", auth, userController.getUserById);

// Update a User by id
router.put("/:id", auth, userController.updateUser);

// Delete user by id
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
