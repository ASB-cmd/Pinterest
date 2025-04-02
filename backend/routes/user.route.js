import express from "express"
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  followUser,
} from "../controller/user.controller.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {verifyToken} from "../middleWares/VerifyToken.js"


const router = express.Router()


router.get('/:username', getUser)
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.post("/follow/:username", verifyToken,followUser);


export default router


// router.post('/create', async (req, res) => {
//   const userInformation = req.body;

//   console.log(userInformation)

//   const hashedPassword = await bcrypt.hash(req.body.password,10)

//   await User.create({
//     displayName: req.body.displayName,
//     username: req.body.username,
//     email: req.body.email,
//     hashedPassword: hashedPassword,
//   });

//   res.json("usercreated")
// });

//   router.get("/fetch", async (req, res) => {
//     const users = await User.find();
//     res.json(users);

//   });
//   router.patch("/update", async (req, res) => {
//     const updateduser = await User.updateOne({ username: "test" }, req.body);
//     res.json(updateduser);
//   });

//    router.delete("/", async (req, res) => {
//      const deleteuser = await User.deleteOne({ username: "test" });
//      res.json(deleteuser);
//    });