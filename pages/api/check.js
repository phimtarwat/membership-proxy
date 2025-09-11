export default async function handler(req, res) {
  const { user_id, token, days, fingerprint } = req.query;

  if (!user_id) {
    return res.status(400).json({ status: "error", message: "ต้องใส่ user_id" });
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbxabnSed4uE5akqQCkdd9dTMDA5C7KFzq7VlS6tCFqvDPSCDM0ESaFyUnWftlr6iM51qQ/exec";
  const url = `${scriptUrl}?user_id=${user_id}${token ? "&token=" + token : ""}${days ? "&days=" + days : ""}${fingerprint ? "&fingerprint=" + fingerprint : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);   // ✅ ส่ง JSON กลับ
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
