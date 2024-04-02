

const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  getResetPassword,
  postResetPassword,
} = require("../controllers/passwordController");

router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:resetId", getResetPassword);
router.post("/resetpassword/:resetId", postResetPassword);

module.exports = router;
