import Contact from "../models/contactModel.js";

const PHONE_REGEX = /^\+?\d[\d\s\-()]{7,19}$/;
const WHATSAPP_REGEX = /^[1-9]\d{9,14}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const validate = ({ phone, whatsapp, email, address }) => {
  if (!phone || !phone.trim()) return "Phone is required.";
  if (!PHONE_REGEX.test(phone.trim())) return "Phone must be a valid phone number.";

  if (!whatsapp || !whatsapp.trim()) return "WhatsApp number is required.";
  if (!WHATSAPP_REGEX.test(whatsapp.trim()))
    return "WhatsApp must be digits only, including country code.";

  if (!email || !email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email.trim())) return "Email must be a valid email address.";

  if (!address || !address.trim()) return "Address is required.";

  return null;
};

export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.findOne();

    res.status(200).json({
      success: true,
      contacts: contact || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateContacts = async (req, res) => {
  try {
    const error = validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const { phone, whatsapp, email, address } = req.body;

    const contact = await Contact.findOneAndUpdate(
      {},
      {
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Contacts updated successfully",
      contacts: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};