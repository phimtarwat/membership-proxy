const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { user_id, token, days } = req.query;

  // ✅ URL ของ Google Apps Script (แก้เป็นของคุณ)
  const scriptUrl = "https://script.google.com/macros/s/AKfycbz9DwcqftMXbES7iXus0ABI97WrnoJvsh-3GADNoSIp5eYDv8_nwnbQna3Be7ELA6g1IQ/exec";

  const url = `${scriptUrl}?user_id=${user_id}${token ? "&token=" + token : ""}${days ? "&days=" + days : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
};

