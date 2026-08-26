import Partner from "../models/partnerModel.js";

export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      partners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Partner added successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPartner = async (req, res) => {
  try {
    const { id } = req.params;

    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    Object.assign(partner, req.body);
    await partner.save();

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
