const router = require("express").Router();
const registrationController = require("./registrationController");
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignUp");

router.post(
  "/registration",
  checkDuplicateUsernameOrEmail,
  registrationController.handleRegisterRequest
);
router.get("/verify-email", registrationController.handleVerifyEmail);
router.post("/verify-otp", registrationController.handleVerifyOtp);
module.exports = router;
