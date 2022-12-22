const { Router } = require("express");
const jwt = require("jsonwebtoken");
require(`dotenv`).config({ debug: true });
const UserModel = require("../models/User.model");

const userRouter = new Router();

const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

userRouter.post("/getuser", async (req, res) => {
  try {
    const user = await UserModel.findOne(req.body);
    if (user === null) {
      return res.status(401).send({ message: "User not found." });
    }
    return res.status(200).send({ message: "User found.", user });
    // res.status(200).send({ message: "User found." });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body, req.params, req.query);
  try {
    const user = await UserModel.findById(id);
    if (user === null) {
      return res.status(401).send({ message: "User not found." });
    }
    return res.status(200).send({ message: "User found.", user });
    // res.status(200).send({ message: "User found." });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const token = await jwt.sign(
      { fName: req.body.fName, username: req.body.username },
      PRIVATE_KEY_JWT
    );
    const newUser = await UserModel.create({ ...req.body, token });
    return res
      .status(200)
      .send({ message: "Account created successfully.", user: newUser });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await EventModel.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .send({ message: "User updated successfully.", user: updatedUser });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "User deleted successfully.", user });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

userRouter.post("/token", async (req, res) => {
  const { token } = req.body;
  try {
    const { fName, username } = await jwt.verify(token, PRIVATE_KEY_JWT);
    const user = await UserModel.findOne({ fName, username });
    if (!user) {
      return res.status(401).send({ message: "User not found." });
    }
    return res.status(200).send({ message: "User found", user });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

module.exports = userRouter;
