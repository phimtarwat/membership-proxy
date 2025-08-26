const fetch = require("node-fetch");

// ✅ Proxy function สำหรับ Vercel
module.exports = async (req, res) => {
  const { user_id, token, days } = req.query;

  // URL ของ Google Apps Script (แก้ตรงนี้)
  const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec";

  const url = `${scriptUrl}?user_id=${user_id}${token ? "&token=" + token : ""}${days ? "&days=" + days : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
};
