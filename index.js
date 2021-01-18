const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const mail = require("./mail");
app.get('/', (req, res) => {
  res.send('Running')
})
app.post("/mail", async (req, res) => {
  const { subject, to, html, text } = req.body;
  const { success, error } = await mail({
    subject,
    to,
    text,
    html,
    from: process.env.FROM,
  });
  if (success) {
    res.send("success");
  } else {
    res.status(500).json(error);
  }
});
app.listen(PORT, () => {
  console.log("listening on", PORT);
});
