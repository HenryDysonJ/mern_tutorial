const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please enter text"]
    },
    feedback: {
        type: String,
        required: [true, "Please enter feedback"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Goals", goalSchema);