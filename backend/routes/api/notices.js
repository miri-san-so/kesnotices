const express = require("express");
const router = express.Router();

// Notice Model
const Notice = require("../../models/Notice");

// @route    >   GET api/notice
// @desc     >   Get all notices
// @access   >   Public
router.get("/", (req, res) => {
  Notice.find()
    .sort({ noticeIndex: 1 })
    .then(notices => res.json(notices));
});

module.exports = router;
