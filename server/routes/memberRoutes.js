const express = require("express");
const router = express.Router();

const Member = require("../models/Member");

// ===============================
// ADD NEW MEMBER
// POST /api/members
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      gender,
      phone,
      address,
      workingGroup,
      status,
      dateJoined,
    } = req.body;

    // Check required fields
    if (!fullName || !gender || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, gender and phone number are required.",
      });
    }

    const newMember = new Member({
      fullName,
      gender,
      phone,
      address,
      workingGroup,
      status,
      dateJoined: dateJoined || undefined,
    });

    const savedMember = await newMember.save();

    res.status(201).json({
      success: true,
      message: "Member added successfully.",
      member: savedMember,
    });
  } catch (error) {
    console.error("Error adding member:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add member.",
      error: error.message,
    });
  }
});

// ===============================
// GET ALL MEMBERS
// GET /api/members
// ===============================
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("Error getting members:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get members.",
      error: error.message,
    });
  }
});

module.exports = router;