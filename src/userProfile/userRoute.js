const router = require("express").Router();
const userController = require("./userController");
const {  verifyToken} = require("../middleware/authJwt");


router.get("/me",verifyToken ,userController.getMe);
module.exports = router;
