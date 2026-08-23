import mongoose from "mongoose";
import { propertyMeta } from "../config/propertyMeta.js";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    priceNumeric: {
      type: Number,
      required: true,
    },

    priceFrequency: {
      type: String,
      enum: propertyMeta.priceFrequencies,
      required: function () {
        return propertyMeta.priceFrequencyStatuses.includes(this.status);
      },
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: propertyMeta.categories,
      required: true,
    },

    status: {
      type: String,
      enum: propertyMeta.statuses,
      required: true,
      validate: {
        validator(value) {
          return propertyMeta.statusesByCategory[this.category].includes(value);
        },
        message: (props) => `Status "${props.value}" is not valid for this category.`,
      },
    },

    furnishing: {
      type: String,
      enum: propertyMeta.furnishing,
      required: function () {
        return propertyMeta.furnishingByCategory[this.category].length > 0;
      },
      validate: {
        validator(value) {
          if (value == null) return true; // absence is `required`'s job, not this validator's
          return propertyMeta.furnishingByCategory[this.category].includes(value);
        },
        message: (props) => `Furnishing "${props.value}" is not valid for this category.`,
      },
    },

    bhk: {
      type: String,
      enum: propertyMeta.bhk,
      required: function () {
        return propertyMeta.bhkByCategory[this.category].length > 0;
      },
      validate: {
        validator(value) {
          if (value == null) return true; // absence is `required`'s job, not this validator's
          return propertyMeta.bhkByCategory[this.category].includes(value);
        },
        message: (props) => `BHK "${props.value}" is not valid for this category.`,
      },
    },

    coverImage: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    beds: {
      type: Number,
    },

    baths: {
      type: Number,
    },

    sqft: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
