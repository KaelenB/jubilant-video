var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/upload', require('./video-upload-route'));
router.use("/video", require("./video-stream-route"));
router.use('/', require('./video-search-route'));

router.get('*', (req, res) => { res.render('404') });

module.exports = router;
