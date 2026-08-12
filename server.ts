import express from "express";
import path from "path";

const app = express();

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Optional: fallback for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
