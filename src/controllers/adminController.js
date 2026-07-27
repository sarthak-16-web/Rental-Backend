import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
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

       const isMatch = await bcrypt.compare(password, admin.password);

if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
}
req.session.adminId = admin._id;
req.session.email = admin.email;


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

export const logoutAdmin = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed",
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    });
};

export const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists.",
            });
        }

        const admin = await Admin.create({
            email,
            password, 
        });

        res.status(201).json({
            success: true,
            message: "Admin created successfully.",
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
