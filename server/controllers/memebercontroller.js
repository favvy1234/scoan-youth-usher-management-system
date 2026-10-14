const Member = require("../models/Member");

const addMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({
      createdAt: -1,
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMember,
  getMembers,
};