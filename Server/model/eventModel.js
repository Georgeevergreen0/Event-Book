const mongoose = require("mongoose");
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: String,
    description: String,
    price: String,
    creator: Schema.Types.ObjectId,
    date: String,
})

module.exports = mongoose.model("Event", eventSchema);