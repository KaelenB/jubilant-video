var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/', require('./video-upload-route'));
router.use("/video", require("./video-stream-route"));
router.use('/search', require('./video-search-route'));


router.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../public/404.html'));
});

module.exports = router;
