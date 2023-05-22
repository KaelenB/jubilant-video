import { Router } from "express";
import { resolve } from "path";
import videoUpload from "./video-upload-route";
import videoStream from "./video-stream-route";

const router = Router();

router.use("/", videoUpload);
router.use("/", videoStream);

router.get("*", (req, res) =>
  res.sendFile(resolve(__dirname + "/../public/404.html"))
);

export default router;
