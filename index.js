const express = require("express");
const cors = require("cors");
require(`dotenv`).config({ debug: true });
const mongooseConnect = require("./config/db.config");
const eventsRouter = require("./routers/Events.routes");
const userRouter = require("./routers/User.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/event", eventsRouter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to my application!");
});

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`Server started on http://localhost:${PORT}`);
});
