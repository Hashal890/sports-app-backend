const { Schema, model, Collection } = require("mongoose");

const UserSchema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: Array, required: false}
  },
  {
    timestamps: true,
  }
);

const UserModel = Collection.users || model("user", UserSchema);

module.exports = UserModel;
