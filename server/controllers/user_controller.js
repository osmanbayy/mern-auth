import userModel from "../models/user_model.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message });
  }
};
