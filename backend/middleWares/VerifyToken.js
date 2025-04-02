
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.JWT_TOKEN, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is Invalid!" });
    }

    req.userId = payload.userId
    next()
  });
}