const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/neel-1").then(() => console.log("connected success")).catch((err) => console.log("error", err));

const sc = new mongoose.Schema({
    shortid: {
        type: String,
        unique: true,

    },
    link: {
        type: String,
        required: true,
    },
    visited: {
        type: Number,
    },
    visitHistory: [{
        timestamp: {
            type: Date,
            default: Date.now,
        },
        ipAddress: Number,
    }],

}, { timestamps: true });
const hi = mongoose.model("hi", sc);
module.exports = hi;
