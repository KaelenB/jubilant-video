const express = require("express");
const videoUploadController = require("../controllers/video-upload-controller");

const router = express.Router();

router.get("/", videoUploadController.initUploadPage);
router.post("/", videoUploadController.uploadFile);

module.exports = router;
