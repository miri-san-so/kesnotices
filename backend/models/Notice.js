const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const NoticeSchema = new Schema({
  noticeIndex: {
    type: String
  },
  noticeTitle: {
    type: String
  },
  noticeDescription: {
    type: String
  },
  noticeLink: {
    type: String
  },
  filters: [
    {
      exam: Boolean,
      defaulter: Boolean,
      atkt: Boolean,
      seating_arrangement: Boolean,
      attendance: Boolean,
      result: Boolean
    }
  ]
});

module.exports = Notice = mongoose.model("notice", NoticeSchema);
