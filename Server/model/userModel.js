const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    createdEvent: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
})

module.exports = mongoose.model("User", userSchema);