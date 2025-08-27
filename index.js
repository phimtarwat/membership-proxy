import express from "express";
import fetch from "node-fetch";

const app = express();

// ✅ Proxy endpoint
app.get("/check", async (req, res) => {
  const { user_id, token, days, fingerprint } = req.query;

  // ✅ เปลี่ยนเป็น URL Google Apps Script API ของคุณ
  const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec";

  const url = `${scriptUrl}?user_id=${user_id}${token ? "&token=" + token : ""}${days ? "&days=" + days : ""}${fingerprint ? "&fingerprint=" + fingerprint : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // ✅ ส่ง JSON ตรงกลับ GPT
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
});

// ✅ ให้ Vercel รู้จัก app
export default app;
