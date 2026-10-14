const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance");
const Member = require("../models/Member");

// ========================================
// MARK MEMBER PRESENT
// ========================================
router.post("/", async (req, res) => {
  try {
    const {
      memberId,
      status,
      attendanceType = "Sunday",
    } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required.",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Attendance status is required.",
      });
    }

    if (!["Early", "Late"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Early or Late.",
      });
    }

    if (
      !["Sunday", "Saturday", "Wednesday"].includes(
        attendanceType
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance type.",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance =
      await Attendance.findOne({
        member: memberId,
        attendanceType,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message:
          "This member has already signed in today.",
      });
    }

    const attendance = new Attendance({
      member: memberId,
      status,
      attendanceType,
    });

    const savedAttendance =
      await attendance.save();

    const populatedAttendance =
      await Attendance.findById(
        savedAttendance._id
      ).populate("member");

    res.status(201).json({
      success: true,
      message: "Attendance recorded successfully.",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error(
      "Error recording attendance:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to record attendance.",
      error: error.message,
    });
  }
});

// ========================================
// GET TODAY'S ATTENDANCE
// ========================================
router.get("/today", async (req, res) => {
  try {
    const attendanceType =
      req.query.type || "Sunday";

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance =
      await Attendance.find({
        attendanceType,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
        .populate("member")
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(
      "Error getting today's attendance:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to get today's attendance.",
      error: error.message,
    });
  }
});

// ========================================
// GET ALL ATTENDANCE
// ========================================
router.get("/", async (req, res) => {
  try {
    const attendance =
      await Attendance.find()
        .populate("member")
        .sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(
      "Error getting attendance:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get attendance.",
      error: error.message,
    });
  }
});

module.exports = router;