import DirectorMessage from "../models/directorMessageModel.js";

const validate = ({ name, role, photo, message }) => {
  if (!name || !name.trim()) return "Name is required.";
  if (!role || !role.trim()) return "Role is required.";
  if (!photo || !photo.trim()) return "Photo URL is required.";
  if (!message || !message.trim()) return "Message is required.";
  return null;
};

export const getDirectorMessage = async (req, res) => {
  try {
    const directorMessage = await DirectorMessage.findOne();

    res.status(200).json({
      success: true,
      directorMessage: directorMessage || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDirectorMessage = async (req, res) => {
  try {
    const error = validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const { name, role, photo, message } = req.body;

    const directorMessage = await DirectorMessage.findOneAndUpdate(
      {},
      {
        name: name.trim(),
        role: role.trim(),
        photo: photo.trim(),
        message: message.trim(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Director's message updated successfully",
      directorMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
