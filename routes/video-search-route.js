const express = require("express");
const router = express.Router();
const videoSearchController = require("../controllers/video-search-controller");

router.get("/", videoSearchController.initSearchPage);
module.exports = router;
