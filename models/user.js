const { Schema, model } = require("mongoose");
const date_format = require("../utils/date");

// USER
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const user = model("user", userSchema);

model.exports = user;
