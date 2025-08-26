export default async function handler(req, res) {
  const { user_id, token, mode, fingerprint } = req.query;

  if (!user_id || !token) {
    return res.status(400).json({
      status: "error",
      message: "กรุณาระบุ user id และ token ของคุณ"
    });
  }

  // 🔹 ใส่ URL Apps Script ที่คุณ deploy แล้ว (ต้องเป็น /exec)
  const scriptUrl = "https://script.google.com/macros/s/AKfycbw6OaScUkvnLpLo1yKZYf862wyM8t11iJHtoTr9iXfbA56xYu8VY62GIEdI_-GThTyoOQ/exec";

  const url = `${scriptUrl}?user_id=${encodeURIComponent(user_id)}&token=${encodeURIComponent(token)}&mode=${encodeURIComponent(mode || "check")}&fingerprint=${encodeURIComponent(fingerprint || "unknown")}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Response is not JSON:", text);
      return res.status(500).json({ status: "error", message: "Invalid JSON from Apps Script", raw: text });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
