const express = require("express");
const router = express.Router();
const { createZapUpiOrder } = require("../controllers/zapupiController");

router.post("/", createZapUpiOrder);
router.get("/", (req, res) => {
  res.json({ status: "ZapUpi API is working" });
});

module.exports = router;
