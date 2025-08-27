import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("Hashtag/Keyword Suggest API is live 🚀");
});

app.get("/suggest", async (req, res) => {
  const q = req.query.q || "seo";
  const yt = req.query.yt;

  try {
    let endpoint;
    if (yt) {
      endpoint = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;
    } else {
      endpoint = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`;
    }

    const resp = await fetch(endpoint);
    const data = await resp.json();

    res.json({ suggestions: data[1] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});