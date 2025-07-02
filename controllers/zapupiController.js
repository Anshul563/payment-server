const axios = require("axios");
const { ZAPUPI_TOKEN, ZAPUPI_SECRET } = require("../config/zapupiConfig");

exports.createZapUpiOrder = async (req, res) => {
  const { amount, order_id, remark, redirect_url } = req.body;

  if (!amount || !order_id || !redirect_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("token_key", ZAPUPI_TOKEN);
    formData.append("secret_key", ZAPUPI_SECRET);
    formData.append("amount", amount);
    formData.append("order_id", order_id);
    formData.append("redirect_url", redirect_url);
    if (remark) formData.append("remark", remark);

    const zapRes = await axios.post(
      "https://api.zapupi.com/api/create-order",
      formData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const zapData = zapRes.data;
    if (zapData.status === "success") {
      res.json({ payment_url: zapData.payment_url, order_id: zapData.order_id });
    } else {
      res.status(400).json({ error: zapData.message });
    }
  } catch (err) {
    console.error("ZapUpi error:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
};
