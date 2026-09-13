import mongoose from "mongoose";
import { projectMeta } from "../config/projectMeta.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    categories: {
      type: [String],
      enum: projectMeta.categories,
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one category is required.",
      },
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one image is required.",
      },
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
