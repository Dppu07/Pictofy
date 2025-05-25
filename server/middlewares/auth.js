// middlewares/auth.js
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId; // set directly on req
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid Token or Login Again" });
  }
};

export default userAuth;
