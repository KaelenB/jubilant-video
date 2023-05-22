import { Router } from "express";
import {
  renderVideo,
  streamVideo,
} from "../controllers/video-stream-controller";

const router = Router();

router.get("/:id", renderVideo);
router.get("/video/:file_name", streamVideo);

export default router;
