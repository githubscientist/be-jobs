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
    profilePicture: String,
    resume: String,
    isBlocked: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema, 'users');