

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = async (req, res, next) => {
  try {
     const authHeader = req.headers["authorization"];

     if (!authHeader) {
       return res.status(401).json({ message: "Unauthorized" });
     }

     
     const token = authHeader.split(" ")[1];

    jwt.verify(token, "secrettoken", async (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ success: false, error: "Invalid token" });
      }

      const userId = decoded.userId;


      const user = await User.findByPk(userId);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, error: "Unauthorized file-auth" });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ success: false, error: "Unauthorized" });
  }
};
