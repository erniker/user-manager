const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Create user
exports.createUser = async (req, res) => {
  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password
  const { email, password } = req.body;

  try {
    // Check if user doesnt exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ msg: "User alredy exists" });
    }
    // Create new user
    user = new User(req.body);

    // Hashing password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Save new user
    await user.save();

    // Create an sign JWT
    const payload = {
      user: { id: user.id },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, // 1 hour
      },
      (error, token) => {
        if (error) throw error;

        // Confirmation message
        res.json({ token: token });
      }
    );

    //res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error creating user");
  }
};
// Get all users
exports.getUsers = async (req, res) => {
  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Get all users
    const users = await User.find({}).sort({
      created: -1,
    });
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unknow error");
  }
};

// Get User By Id
exports.getUserById = async (req, res) => {
  // Extract email and password
  const { email } = req.body;

  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Get user by ID
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unknow error");
  }
};

// Update a user by id
exports.updateUser = async (req, res) => {
  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Extract email and password
  const { name, email, password } = req.body;

  // Check if email already exists
  let emailExist = await User.findOne({ email });
  let user = await User.findById(req.params.id);

  if (!(emailExist.email === user.email))
    return res.status(422).json({ msg: "User alredy exists" });

  const updateUser = {};
  updateUser.name = name;
  updateUser.email = email;
  updateUser.password = password;

  // Hashing password
  const salt = await bcryptjs.genSalt(10);
  updateUser.password = await bcryptjs.hash(password, salt);

  try {
    //update
    project = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateUser },
      { new: true }
    );
    // Create an sign JWT
    const payload = {
      updateUser: { id: updateUser.id },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, // 1 hour
      },
      (error, token) => {
        if (error) throw error;

        // Confirmation message
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Unknow error");
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    // Check id
    let user = await User.findById(req.params.id);
    // Check if user exist
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete User
    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unknow error");
  }
};
