const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const FIREBASE_URL = "https://pyrosafe-3e496-default-rtdb.firebaseio.com/";

app.post("/upload", async (req, res) => {
  const data = req.body;
  console.log("Received data from SIM800L:", data);

  try {
    const response = await fetch(FIREBASE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    res.send({ status: "ok", firebase: result });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
