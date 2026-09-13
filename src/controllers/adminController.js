import Admin from "../models/Admin.js";
import { generateAccessToken } from "../utils/generateTokens.js";

// SameSite=None requires Secure, or every modern browser silently drops the
// cookie - which is exactly what was happening in local dev (NODE_ENV isn't
// "production", so secure was false while sameSite stayed "None"). Only use
// the cross-site-capable None+Secure pair in production; Lax works fine for
// local dev over plain HTTP.
const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Lax",
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(admin);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 5, // 5 hours
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("accessToken", cookieOptions);

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export const checkAdminSession = (req, res) => {
  res.json({ success: true, admin: req.admin });
};
