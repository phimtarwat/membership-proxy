export default async function handler(req, res) {
  const { user_id, token, mode, fingerprint } = req.query;

  if (!user_id || !token) {
    return res.status(400).json({
      status: "error",
      message: "ต้องใส่ user_id และ token"
    });
  }

  // ✅ URL ของ Google Apps Script (แก้ตรงนี้)
  const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  const url = `${scriptUrl}?user_id=${encodeURIComponent(user_id)}&token=${encodeURIComponent(token)}&mode=${encodeURIComponent(mode || "check")}&fingerprint=${encodeURIComponent(fingerprint || "unknown")}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Response is not JSON:", text);
      return res.status(500).json({ status: "error", message: "Invalid JSON from Apps Script" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
