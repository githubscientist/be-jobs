const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Company', companySchema, 'companies');