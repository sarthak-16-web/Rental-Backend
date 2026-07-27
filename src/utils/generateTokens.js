import jwt from "jsonwebtoken";

export const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } // short-lived
  );
};

export const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "5h" } // your 5-hour login window
  );
};
