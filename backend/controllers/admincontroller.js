const Admin = require("../models/adminModel");
const APPLICATION = require("../models/applicationModel");
const SLOT = require("../models/slotModel");
const generateToken = require("../utils/generateToken");
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

const loginAdmin = async (req, res, next) => {
  console.log("llllll");
  try {
    const { email, password } = req.body;
    const admin = await Admin.login(email, password);
    const token = generateToken(admin._id);
    res.status(200).json({ admin: admin._id, token, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

const applicationList = async (req, res) => {
  const applicationList = await APPLICATION.find({ status: "PENDING" });
  if (applicationList.length > 0) {
    res.json(applicationList);
  } else {
    res.json({ status: false });
  }
};

const viewApp = async (req, res) => {
  console.log("iddddddddd" + req.params.id);
  const Application = await APPLICATION.findOne({ _id: req.params.id });
  console.log(Application);
  res.json(Application);
};
const updateNewAppStat = async (req, res) => {
  const Application = await APPLICATION.updateOne(
    { _id: req.params.id },
    { $set: { status: "PROCESSING" } }
  );
  res.json({ status: true });
};
const approveNewAppStat = async (req, res) => {
  const Application = await APPLICATION.updateOne(
    { _id: req.params.id },
    { $set: { status: "APPROVED" } }
  );
  res.json({ status: true });
};
const rejectNewAppStat = async (req, res) => {
  const Application = await APPLICATION.updateOne(
    { _id: req.params.id },
    { $set: { status: "REJECTED" } }
  );
  res.json({ status: true });
};

const approvedApp = async (req, res) => {
  const approved = await APPLICATION.find({ status: "APPROVED" });
  if (approved.length > 0) {
    res.json({ approved });
  } else {
    res.json({ status: false });
  }
};
const processingApp = async (req, res) => {
  const processing = await APPLICATION.find({ status: "PROCESSING" });
  if (processing.length > 0) {
    res.json({ processing });
  } else {
    res.json({ status: false });
  }
};
const getBookingSlots = async (req, res) => {
  try {
    const slots = await SLOT.find({});
    res.json(slots);
  } catch (error) {
    res.json({ error, bookedSlots: false });
  }
};
const getApplications = async (req, res) => {
  try {
    const approvedApp = await APPLICATION.find({
      $and: [{ status: "APPROVED" }, { bookingStatus: false }],
    });
    res.json(approvedApp);
  } catch (error) {
    res.json({ error, bookedSlots: false });
  }
};

const slotUpdate = async (req, res) => {
  try {
    const { applicantId, slotId, slotSection } = req.body;
    const application = await APPLICATION.findByIdAndUpdate({
      _id: applicantId,
    });
    console.log(application);
    const bookSlot = await SLOT.findByIdAndUpdate(
      { _id: slotId },
      {
        $set: {
          selected: true,
          companyname: application.companyName,
          user_email: application.email,
        },
      }
    );
    res.json(bookSlot);
  } catch (error) {
    res.json({ error, slotUpdate: false });
  }
};

const slotDuplicate = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const duplicate = await APPLICATION.findById({ _id: applicantId });
    console.log(duplicate);
    if (!duplicate.bookingStatus) {
      await APPLICATION.findByIdAndUpdate(
        { _id: applicantId },
        { $set: { bookingStatus: true } }
      );
      res.status(200).json({ noDuplicate: true });
    }
    res.status(200).json({ duplicateRemoved: true });
  } catch (error) {
    res.status(500).json({ error, slotDuplicate: false });
  }
};

module.exports = {
  loginAdmin,
  applicationList,
  viewApp,
  updateNewAppStat,
  approveNewAppStat,
  rejectNewAppStat,
  approvedApp,
  processingApp,
  getBookingSlots,
  getApplications,
  slotUpdate,
  slotDuplicate,
};
