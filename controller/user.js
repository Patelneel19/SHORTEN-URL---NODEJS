const mongoose = require("mongoose");
const usersc = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    pssd: { 
        type: String,
        required:true,
    },
    
}, {
    timestamps: true
});
const User = mongoose.model("user", usersc);
module.exports = User;