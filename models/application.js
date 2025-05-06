const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'offered', 'rejected'],
        default: 'applied',
    },
}, { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema, 'applications');