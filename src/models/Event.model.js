const { Schema, model, Collection, SchemaTypes } = require("mongoose");

const EventSchema = new Schema(
  {
    createdBy: { type: SchemaTypes.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: Date, required: true },
    limit: { type: Number, required: true },
    acceptedUsers: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

const EventModel = Collection.events || model("event", EventSchema);

module.exports = EventModel;
