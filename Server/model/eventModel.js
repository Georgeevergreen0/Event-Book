const mongoose = require("mongoose");
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdBy: { type: String },
    bookedBy: [{ type: String }],
    date: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model("Event", eventSchema);