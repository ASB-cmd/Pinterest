import express from "express"
import {
  getPin,
  getPins,
  createPin,
  interactionCheck,
  interact,
} from "../controller/pin.controller.js";
import { verifyToken } from "../middleWares/VerifyToken.js"

const router = express.Router()

router.get('/',getPins)
router.get('/:id', getPin)
router.post("/", verifyToken,createPin);
router.get("/interaction-check/:id", interactionCheck);
router.post("/interact/:id",verifyToken, interact);

export default router