const mongoose = require("mongoose");

let Schema = mongoose.Schema;

var noticeSchema = new Schema({
  noticeIndex: Number,
  noticeTitle: String,
  noticeDescription: String,
  noticeLink: String,
  filters: {
    exam: Boolean,
    defaulter: Boolean,
    atkt: Boolean,
    seating_arrangement: Boolean,
    attendance: Boolean,
    result: Boolean,
    detention: Boolean
  }
});

let Notice = mongoose.model("Notices", noticeSchema);

module.exports = Notice;
