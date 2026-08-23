import Property from "../models/propertyModel.js";
import { propertyMeta } from "../config/propertyMeta.js";

// Add Property
export const addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit Property
export const editProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    Object.assign(property, req.body);
    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPropertySchema = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            categories: propertyMeta.categories,
            statuses: propertyMeta.statuses,
            furnishing: propertyMeta.furnishing,
            bhk: propertyMeta.bhk,
            statusesByCategory: propertyMeta.statusesByCategory,
            furnishingByCategory: propertyMeta.furnishingByCategory,
            bhkByCategory: propertyMeta.bhkByCategory,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getAllProperties = async (req, res) => {
    try {

        const properties = await Property.find();

        res.status(200).json({
            success: true,
            properties,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
