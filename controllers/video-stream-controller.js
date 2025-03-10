const path = require("path");
const fs = require("fs");
const url = require("url");
const handleDb = require("../db/handle-db");

const getFile = (file_name, callback) => {
  fs.readFile(path.resolve(process.env.FILE_UPLOAD_PATH, file_name), callback);
};

const streamVideoFile = (req, res, video_file) => {
  const path = process.env.FILE_UPLOAD_PATH + req.params.file_name;
  const total = video_file.length;
  const range = req.headers.range;
  if (range) {
    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = end - start + 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
    res.end(video_file.slice(start, end + 1), "binary");
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
  }
};

module.exports.renderVideo = (req, res) => {
  const fileDetails = handleDb.getFile(req.params.id);
  if (!fileDetails) {
    return res.send("INVALID FILE ID");
  }
  const storedFileName = fileDetails.path.split("/")[1];
  const videoDetails = fileDetails.details || "NA";
  const videoName = fileDetails.name;

  res.render("play", { storedFileName: storedFileName, videoDetails: videoDetails, videoName: videoName })
};

module.exports.streamVideo = (req, res) => {
  const file_name = req.params.file_name;

  const handleFile = (error, file_data) => {
    if (error) {
      if (error.code === "ENOENT") {
        return res.status(404).json({
          error: "No such file found",
        });
      }
      return res.json(error);
    }
    streamVideoFile(req, res, file_data);
  };

  getFile(file_name, handleFile);
};
