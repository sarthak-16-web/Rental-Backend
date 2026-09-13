import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      enum: ["cloudinary", "local"],
      required: true,
    },

    providerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Asset", assetSchema);
