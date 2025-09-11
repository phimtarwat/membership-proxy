export default async function handler(req, res) {
  const { user_id, token, fingerprint } = req.query;

  if (!user_id || !token) {
    return res.status(400).json({ status: "error", message: "ต้องใส่ user_id และ token" });
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwTw5LQX7Hr--ZCGwL925wXcupemkoqnij92lnstQhXaiLVxNbd-qKePS2dbpdq4LnIaA/exec";
  const url = `${scriptUrl}?user_id=${user_id}&token=${token}&mode=use${fingerprint ? "&fingerprint=" + fingerprint : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
