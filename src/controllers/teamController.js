import TeamMember from "../models/teamMemberModel.js";

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    Object.assign(member, req.body);
    await member.save();

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
