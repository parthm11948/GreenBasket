import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 🔑 Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing.",
      });
    }

    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Support both token payload formats
    req.user = {
      id: decoded.id || decoded.userId,
    };

    if (!req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    // ⏰ Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    // ❌ Invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};