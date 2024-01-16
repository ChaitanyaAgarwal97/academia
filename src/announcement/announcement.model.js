const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  description: {
    type: String,
  },
  lastDate: {
    type: Date,
  },
  points: {
    type: Number,
  },
  filePath: [
    {
      type: String,
    },
  ],
});

const Announcement = new mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;
