import express from "express"
import { getUserBoards } from "../controller/board.controlloer.js";


const router = express.Router()



router.get('/:userId', getUserBoards)


export default router