const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const { verifyToken } = require("../middleware/auth");

router.post("/payment", verifyToken, purchaseController.Purchasepremium);


router.post(
  "/success",
  verifyToken,
  purchaseController.successfulTransaction
);
router.post(
  "/failed",
  verifyToken,
  purchaseController.failedTransaction
);


module.exports = router;
