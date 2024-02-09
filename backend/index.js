const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/newSearch", async (req, res) => {
  const { line } = req.body;
  return res.json({ line: line});
});

app.listen(3001);