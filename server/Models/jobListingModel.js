const mongoose = require('mongoose');
const validator = require('validator');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['On-Site', 'Remote'],
        required: true
    },
    filesPath: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
        required: true,
    },
});

const JobListing = mongoose.model('Job', JobSchema);

module.exports = JobListing;