const router = require("express").Router();
const loginController = require("./loginController");

router.post("/login", loginController.handleLoginRequest);
router.post("/refreshtoken", loginController.refreshToken);
module.exports = router;
