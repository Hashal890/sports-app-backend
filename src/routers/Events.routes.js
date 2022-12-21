const { Router } = require("express");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model");

const eventsRouter = new Router();

eventsRouter.post("/", async (req, res) => {
  try {
    const newEvent = await EventModel.create(req.body);
    const user = await UserModel.findById(newEvent.createdBy);
    await UserModel.findByIdAndUpdate(newEvent.createdBy, {
      createdEvent: [...user.createdEvent, newEvent],
    });
    res
      .status(200)
      .send({ message: "Event created successfully.", event: newEvent });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

eventsRouter.patch("/", async(req, res) => {
    
})

module.exports = eventsRouter;
