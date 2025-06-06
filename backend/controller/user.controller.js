import bcrypt from 'bcryptjs';
import User  from '../models/user.model.js'
import jwt from "jsonwebtoken";
import Follow from '../models/follow.model.js';

export const registerUser = async (req, res) => {
  const {username, displayName, email, password} =req.body

  if (!username || !email || !password) {
    return res.status(400).json({message:  "All field are required!"})
  }

  const newHasedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    displayName,
    email,
    hashedPassword: newHasedPassword,
  })


  const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

  res.cookie("token", token,{
    httpOnly: true,
    secure:process.env.NODE_ENV = "production",
    maxAge: 30 * 24 *60 * 60 * 1000,
  })
  const { hashedpassword, ...detailWithoutPassword } = user.toObject();

  res.status(201).json(detailWithoutPassword);

};


export const loginUser = async (req, res) => {
  const { email, password} =req.body

  if (!email || !password) {
    return res.status(400).json({message:  "All field are required!"})
  }

  const user = await User.findOne({email})

  if (!user){
    res.status(401).json({message:  "Invalid email or password"})
  }
  const isPsswordcorrect = await bcrypt.compare(password, user.hashedPassword)

  if (!isPsswordcorrect){
    res.status(401).json({message:  "Invalid email or password"})

  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

  res.cookie("token", token, {
    httpOnly: true,
    secure: (process.env.NODE_ENV = "production"),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });


  const { hashedpassword, ...detailWithoutPassword } = user.toObject();

  res.status(200).json(detailWithoutPassword);

};
export const logoutUser = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Logout Successful" });
};

export const getUser = async(req, res) =>{
  const { username } = req.params;

  const user = await User.findOne({ username });

  const {hashedpassword, ...detailWithoutPassword} = user.toObject()

  const followerCount = await Follow.countDocuments({following:user._id})
  const followingCount = await Follow.countDocuments({ follower: user._id });
  
  const token = req.cookies.token;
  if (!token){
    res.status(200).json({...detailWithoutPassword, followerCount, followingCount, isFollowing: false});
  }else{
    jwt.verify(token, process.env.JWT_TOKEN, async (err, payload) => {
      if (!err) {
        const isExists = await Follow.exists({
          follower: payload.userId,
          following: user._id,
        });
        res.status(200).json({
          ...detailWithoutPassword,
          followerCount,
          followingCount,
          isFollowing: isExists ? true : false,
        });
      }
    });
  }
  
  }

export const followUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  const isFollowing = await Follow.exists({
    follower:req.userId,
    following: user._id
  })

  if (isFollowing){
    await Follow.deleteOne({
      follower: req.userId,
      following: user._id,
    });
  } else{
     await Follow.create({
       follower: req.userId,
       following: user._id,
     });
  }
    res.status(200).json({message:"Successful"})
};