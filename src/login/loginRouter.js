const router = require("express").Router();
const loginController = require("./loginController");

router.post("/login", loginController.handleLoginRequest);

module.exports = router;
