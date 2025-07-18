const bcrypt = require("bcrypt");
const User = require("../models/User");
const { setUser } = require("../services/jwt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ message: "Invalid email format." });
  }


  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "User already Exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email:email.toLowerCase(),
      password: hashedPassword,
    });

    const authenticationToken = setUser(user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: authenticationToken
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);  

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const authenticationToken = setUser(user);
    console.log("yes user is getting logged in");
    return res.status(200).json({
      message: "Logged in successfully.",
      token: authenticationToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    }); 
  }
};

const userLoginStatus = (req, res) => {
  const { _id, name } = req.user;

  return res.status(200).json({
    message: "User is logged in",
    user: { id: _id, name }
  });
};


module.exports = { signup, login, userLoginStatus };
