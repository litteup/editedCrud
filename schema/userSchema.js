const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true});

<<<<<<< HEAD
const userCollection = mongoose.model("user", userSchema);
=======
const userCollection = mongoose.model("users", userSchema);
>>>>>>> eeb454b (upload after making first correction)

module.exports = {
    userCollection
};