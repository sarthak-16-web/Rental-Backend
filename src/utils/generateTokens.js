import jwt from "jsonwebtoken";

// Single token matching the actual intended session length. There used to
// be a separate short-lived access token + refresh token pair, but nothing
// ever drove the refresh flow, so in practice sessions died after 15
// minutes instead of the 5 hours this was designed for.
export const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "5h" }
  );
};
