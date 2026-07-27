import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
    },

    priceNumeric: {
      type: Number,
      required: true,
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
      enum: ["Apartment", "Villa", "House", "Plot", "Commercial"],
      required: true,
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
