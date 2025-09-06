const { findUserById } = require("./userService");

const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await findUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMe,
};
