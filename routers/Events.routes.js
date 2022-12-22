const { Router } = require("express");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model");

const eventsRouter = new Router();

eventsRouter.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  if (!req.query.q && !req.query.filter) {
    try {
      const event = await EventModel.paginate({}, { page, limit });
      res.status(200).send({ message: "All the events are given.", event });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  } else if (req.query.q && !req.query.filter) {
    // console.log(req.query.q);
    try {
      const event = await EventModel.paginate(
        { $text: { $search: req.query.q } },
        { page, limit }
      );
      res.status(200).send({ message: "All the events are given.", event });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  } else if (!req.query.q && req.query.filter) {
    try {
      const event = await EventModel.paginate(
        { limit: { $lt: req.query.filter } },
        { page, limit }
      );
      res.status(200).send({ message: "All the events are given.", event });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  } else {
    try {
      const event = await EventModel.paginate(
        { title: req.query.q, limit: { $lt: req.query.filter } },
        { page, limit }
      );
      res.status(200).send({ message: "All the events are given.", event });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  }
});

eventsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    if (!event) {
      res.status(401).send({ message: "Event not found." });
    }
    res.status(200).send({ message: "Event found", event });
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
