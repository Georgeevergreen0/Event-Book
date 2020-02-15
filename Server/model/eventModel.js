const mongoose = require("mongoose");
const Schema = mongoose.Schema

const authorSchema = new Schema({
    title: String,
    description: String,
    price: String,
    date: String,
})

module.exports = mongoose.model("Event", authorSchema);