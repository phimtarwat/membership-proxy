export default async function handler(req, res) {
  const { user_id, token, fingerprint } = req.query;
  console.log("👉 Incoming USE request:", { user_id, token, fingerprint });

  if (!user_id || !token) {
    console.log("❌ Missing parameters");
    return res.status(400).json({
      status: "error",
      message: "ต้องใส่ user_id และ token"
    });
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbxRCVRAK4is7GcqNEuq-NcPplxCrRSAt21gJ8xDhbNm_iIGAPYKzXOvNepob4wqdsDyQg/exec";
  const url = `${scriptUrl}?user_id=${encodeURIComponent(user_id)}&token=${encodeURIComponent(token)}&mode=use&fingerprint=${encodeURIComponent(fingerprint || "unknown")}`;

  console.log("🔗 Fetching (USE):", url);

  try {
    const response = await fetch(url);
    const text = await response.text();
    console.log("📩 Response from GAS (USE):", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Invalid JSON:", text);
      return res.status(500).json({
        status: "error",
        message: "Invalid JSON from Apps Script",
        raw: text
      });
    }

    console.log("✅ Final response to client (USE):", data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

