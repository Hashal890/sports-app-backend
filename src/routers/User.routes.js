const { Router } = require("express");
const UserModel = require("../models/User.model");

const userRouter = new Router();

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body, req.params, req.query);
  try {
    const user = await UserModel.find({ _id: id });
    res.status(200).send({ message: "User found.", user });
    // res.status(200).send({ message: "User found." });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res
      .status(200)
      .send({ message: "Account created successfully.", user: newUser });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = userRouter;
