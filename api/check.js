module.exports = async (req, res) => {
  const { user_id, token, mode } = req.query;
  const fingerprint = req.headers["user-agent"] || "unknown";

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwNHPgVP7sE-iVQtHYadPXJvhekuxLeu6LshZSLo_DGWohiGmVmWMFpR9SlIHtK9stiEA/exec";
  const url = `${scriptUrl}?user_id=${user_id}&token=${token}&mode=${mode}&fingerprint=${encodeURIComponent(fingerprint)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
};
