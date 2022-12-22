const { Router } = require("express");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model");

const eventsRouter = new Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const event = await EventModel.find({});
    res.status(200).send({ message: "All the events are given.", event });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

eventsRouter.post("/", async (req, res) => {
  try {
    const newEvent = await EventModel.create(req.body);
    const user = await UserModel.findById(newEvent.createdBy);
    if (user === null) {
      return res.status(401).send({ message: "User not found." });
    }
    await UserModel.findByIdAndUpdate(newEvent.createdBy, {
      createdEvent: [...user.createdEvent, newEvent],
    });
    return res
      .status(200)
      .send({ message: "Event created successfully.", event: newEvent });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

eventsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .send({ message: "Event updated successfully.", event: updatedEvent });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

module.exports = eventsRouter;
