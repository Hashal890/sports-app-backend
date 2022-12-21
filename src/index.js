const express = require("express");
require(`dotenv`).config({ debug: true });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to my application!");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
