import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        if (admin.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful.",
            admin: {
                id: admin._id,
                email: admin.email,
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};