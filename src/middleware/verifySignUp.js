const {
  findUserByEmail,
} = require("../login/loginService");

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    const { email } = req.body;

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    console.error("Error in duplicate check:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { checkDuplicateUsernameOrEmail };
