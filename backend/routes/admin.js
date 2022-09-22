const express = require("express");
const {
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
} = require("../controllers/admincontroller");
const router = express.Router();

router.route("/login").post(loginAdmin);
router.get("/adminpanel", applicationList);
router.get("/viewApplication/:id", viewApp);
router.patch("/updateNewAppStatus/:id", updateNewAppStat);
router.patch("/approveNewAppStatus/:id", approveNewAppStat);
router.patch("/rejectNewAppStatus/:id", rejectNewAppStat);
router.get("/approved", approvedApp);
router.get("/processing", processingApp);
router.get("/getBookingSlots", getBookingSlots);
router.get("/getApplications", getApplications);
router.post("/slotUpdate", slotUpdate);
router.patch("/slotDuplicate", slotDuplicate);

module.exports = router;
