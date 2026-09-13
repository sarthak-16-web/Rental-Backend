import Testimonial from "../models/testinomalModel.js";

// Add Testimonial (admin) — curating it directly is the approval, so it
// always goes live immediately.
export const addTestimonial = async (req, res) => {
  try {
    const { name, review } = req.body;
    const testimonial = await Testimonial.create({ name, review, approved: true });

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Submit Testimonial (public) — only name/review are ever accepted from the
// client; approved is always forced to false here regardless of what's sent,
// so a review only goes live once an admin approves it.
export const submitTestimonial = async (req, res) => {
  try {
    const { name, review } = req.body;
    const testimonial = await Testimonial.create({ name, review, approved: false });

    res.status(201).json({
      success: true,
      message: "Thanks for your review — it'll appear once approved.",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit Testimonial (admin) — also how a pending review gets approved,
// via { approved: true } in the body.
export const editTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    Object.assign(testimonial, req.body);
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Testimonial (admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Testimonials (admin) — pending and approved, for moderation.
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Approved Testimonials (public) — what the homepage shows.
export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
