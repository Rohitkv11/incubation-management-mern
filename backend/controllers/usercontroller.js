const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const APPLICATION = require("../models/applicationModel");
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    // res.cookie("jwt",token,{
    //     withCredentials:true,
    //     httpOnly:false,
    //     maxAge:"5d"
    // })
    res.status(201).json({ user: user._id, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
    console.log(errors);
  }
};

const loginUser = async (req, res, next) => {
  console.log("llllll");
  try {
   
    const{ email, password } = req.body;

    console.log(email);
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ user: user._id, token, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

const userApplication = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      address,
      city,
      state,
      phoneNo,
      companyName,
      team,
      product,
      problem,
      solution,
      proposition,
      competators,
      revenue,
      market,
      plan,
      type,
      proposal,
      userId,
      auth,
    } = req.body;
    if (
      name &&
      email &&
      address &&
      city &&
      state &&
      phoneNo &&
      companyName &&
      team &&
      product &&
      problem &&
      solution &&
      proposition &&
      competators &&
      revenue &&
      market &&
      plan &&
      type &&
      proposal &&
      userId &&
      auth
    ) {
      console.log("Reg Success");
      const newApplication = await APPLICATION.create({
        name,
        email,
        address,
        city,
        state,
        phoneNo,
        companyName,
        team,
        product,
        problem,
        solution,
        proposition,
        competators,
        revenue,
        market,
        plan,
        type,
        proposal,
        status: "PENDING",
        userId,
        bookingStatus: false,
        slotCode: "null",
      });
      res.status(201).json({ newApplication });
    } else {
      console.log("Reg Failed");
      res.status(401).json({ Error });
    }
  } catch (error) {
    console.log("Reg Failedddddddd");
  }
};

const viewStatus = async (req, res) => {
  console.log("Statusssssssssssssss");
  console.log(req.params.id);
  const ViewStatus = await APPLICATION.find({ userId: req.params.id });
  res.json(ViewStatus);
};

module.exports = { registerUser, loginUser, userApplication, viewStatus };
