import express from "express"
import {
  getPostComments,
  addComment,} from "../controller/comment.controller.js";
import { verifyToken } from "../middleWares/VerifyToken.js";


const router = express.Router()

router.get("/:postId", getPostComments);
router.post("/", verifyToken, addComment);


export default router