export default async function handler(req, res) {
  const { user_id, token, mode, fingerprint } = req.query;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwS2DgMBTJJOzrXkyknOnc-uE-PjBHmSoOXpLBZt-YcdK2ZIQioA-Z55952Vt1GabuYnQ/exec";
  const url = `${scriptUrl}?user_id=${encodeURIComponent(user_id)}&token=${encodeURIComponent(token)}&mode=${encodeURIComponent(mode)}&fingerprint=${encodeURIComponent(fingerprint || "unknown")}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
