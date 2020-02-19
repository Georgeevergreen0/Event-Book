const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdEvent: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
})

module.exports = mongoose.model("User", userSchema);