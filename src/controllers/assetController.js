import Asset from "../models/assetModel.js";
import { uploadImage as storeImage, deleteImage } from "../utils/imageStore.js";

export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadAsset = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required." });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "An image file is required." });
    }

    const existing = await Asset.findOne({ name });
    if (existing) {
      return res.status(409).json({ success: false, message: "An asset with that name already exists." });
    }

    const { url, provider, providerId } = await storeImage(req.file.buffer, req.file.originalname, req);

    const asset = await Asset.create({ name, url, provider, providerId });

    res.status(201).json({
      success: true,
      message: "Asset uploaded successfully",
      asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findById(id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    await deleteImage({ provider: asset.provider, providerId: asset.providerId });
    await asset.deleteOne();

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
