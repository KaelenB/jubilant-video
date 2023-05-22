import { diskStorage } from "multer";
import { statSync, mkdirSync } from "fs";

const fileFilter = (req, file, callback) => {
  const errorMessage = "";
  if (!file || file.mimetype !== "video/mp4") {
    errorMessage = `Wrong file type ${file.originalname
      .split(".")
      .pop()}found. Only mp4 video files are allowed!`;
  }
  if (errorMessage) {
    return callback(
      { errorMessage: errorMessage, code: "LIMIT_FILE_TYPE" },
      false
    );
  }
  callback(null, true);
};

const destinationPath = (req, file, callback) => {
  const stat = null;
  try {
    stat = statSync(process.env.FILE_UPLOAD_PATH);
  } catch (err) {
    mkdirSync(process.env.FILE_UPLOAD_PATH);
  }
  callback(null, process.env.FILE_UPLOAD_PATH);
};

const fileNameConvention = (req, file, callback) => {
  callback(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
};

const limits = {
  fileSize: parseInt(process.env.FILE_SIZE) * 1024 * 1024, // 200MB
};

const storage = diskStorage({
  destination: destinationPath,
  filename: fileNameConvention,
});

const fileUploadConfig = {
  fileFilter: fileFilter,
  storage: storage,
  limits: limits,
};

const _fileUploadConfig = fileUploadConfig;
export { _fileUploadConfig as fileUploadConfig };
