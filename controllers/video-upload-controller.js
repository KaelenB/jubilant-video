import { resolve } from "path";
import { fileUploadConfig } from "../config/file-upload-config";
import { saveToDB } from "../db/handle-db";
import multer from "multer";

export const initUploadPage = (req, res) => {
  res.sendFile(resolve(__dirname + "/../public/video_upload_test.html"));
}

export const uploadFile = (req, res) => {
  const upload = multer(fileUploadConfig).single("user-file");
  upload(req, res, (uploadError) => {
    if (uploadError) {
      let errorMessage;
      if (uploadError.code === "LIMIT_FILE_TYPE") {
        errorMessage = uploadError.errorMessage;
      } else if (uploadError.code === "LIMIT_FILE_SIZE") {
        errorMessage = `Maximum file size allowed is ${process.env.FILE_SIZE}MB`;
      }
      return res.json({
        error: errorMessage,
      });
    }
    const fileId = req.file.filename.split("-")[0];
    const link = `http://${req.hostname}:${process.env.PORT}/video/${req.file.filename}/play`;

    res.json({
      success: true,
      link: link,
    });
    const attributesToBeSaved = {
      id: fileId,
      name: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      encoding: req.file.encoding,
      details: req.body.details ? req.body.details : "",
    };
    saveToDB(attributesToBeSaved);
  });
}
