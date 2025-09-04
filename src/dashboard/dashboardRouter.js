const router = require("express").Router();
const { verifyToken } = require("../middleware/authJwt");

router.get("/dashboard", verifyToken, async (req, res) => {

  res.status(200).json({message:"This is dashboard"});
});
module.exports = router;
