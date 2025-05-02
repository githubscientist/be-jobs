const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'recruiter', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ""
    },
    resume: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema, 'users');