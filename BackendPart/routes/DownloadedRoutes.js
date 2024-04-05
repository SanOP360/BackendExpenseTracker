const express = require("express");
const router = express.Router();

const downloadController = require("../controllers/downloadControllers");
const { verifyToken } = require("../middleware/auth");

router.get("/file",verifyToken, downloadController.downloadExpenses);
router.get("/list",verifyToken,downloadController.listDownloadedFiles);

module.exports = router;
