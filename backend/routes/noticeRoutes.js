const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const {
  createNotice,
  getNotices,
  approveNotice
} = require("../controllers/noticeController");

// Anyone logged in can view approved notices
router.get("/", authenticate, getNotices);

// Admin & Faculty can create notice
router.post(
  "/",
  authenticate,
  authorize(["admin", "faculty"]),
  createNotice
);

// Only Admin can approve
router.put(
  "/approve/:id",
  authenticate,
  authorize(["admin"]),
  approveNotice
);

module.exports = router;