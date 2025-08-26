import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/check", async (req, res) => {
  const { user_id, token, days } = req.query;

  // ✅ URL ของ Google Apps Script (แก้ตรงนี้ให้เป็นของคุณเอง)
  const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec";

  const url = `${scriptUrl}?user_id=${user_id}${token ? "&token=" + token : ""}${days ? "&days=" + days : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // ✅ ส่ง JSON กลับ GPT
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
});

// ✅ Vercel ใช้ export default
export default app;
