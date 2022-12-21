const { Router } = require("express");
const jwt = require("jsonwebtoken");
require(`dotenv`).config({ debug: true });
const UserModel = require("../models/User.model");

const userRouter = new Router();

const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body, req.params, req.query);
  try {
    const user = await UserModel.findById(id);
    res.status(200).send({ message: "User found.", user });
    // res.status(200).send({ message: "User found." });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    const token = await jwt.sign(
      { fName: newUser.fName, username: newUser.username },
      PRIVATE_KEY_JWT
    );
    res
      .status(200)
      .send({ message: "Account created successfully.", user: newUser, token });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await EventModel.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .send({ message: "User updated successfully.", event: updatedUser });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = userRouter;
