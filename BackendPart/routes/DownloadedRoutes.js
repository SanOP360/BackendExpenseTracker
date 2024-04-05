const express = require("express");
const router = express.Router();

const downloadController = require("../controllers/downloadControllers");
const { verifyToken } = require("../middleware/auth");

router.get("/file",verifyToken, downloadController.downloadExpenses);

module.exports = router;
