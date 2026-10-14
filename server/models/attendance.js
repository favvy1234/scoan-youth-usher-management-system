const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Early", "Late"],
      required: true,
    },

    attendanceType: {
      type: String,
      enum: ["Sunday", "Saturday", "Wednesday"],
      default: "Sunday",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  { member: 1, date: 1, attendanceType: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);