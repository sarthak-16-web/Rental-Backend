import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import cloudinary, { cloudinaryConfigured } from "../config/cloudinary.js";

const UPLOADS_DIR = path.resolve("uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "rentalking-assets" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, provider: "cloudinary", providerId: result.public_id });
      }
    );
    stream.end(buffer);
  });

const uploadToLocalDisk = (buffer, originalFilename, req) => {
  const ext = path.extname(originalFilename) || "";
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);
  const url = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
  return { url, provider: "local", providerId: filename };
};

// req is only needed for the local fallback, to build an absolute URL.
export const uploadImage = async (buffer, originalFilename, req) => {
  if (cloudinaryConfigured) return uploadToCloudinary(buffer);
  return uploadToLocalDisk(buffer, originalFilename, req);
};

export const deleteImage = async ({ provider, providerId }) => {
  if (provider === "cloudinary") {
    await cloudinary.uploader.destroy(providerId);
    return;
  }
  const filePath = path.join(UPLOADS_DIR, providerId);
  fs.rm(filePath, { force: true }, () => {});
};
