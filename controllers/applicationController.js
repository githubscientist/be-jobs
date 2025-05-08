const Job = require('../models/job');
const Application = require('../models/application');

const applicationController = {
    applyJob: async (req, res) => {
        try {
            const { jobId } = req.params;

            const userId = req.userId;

            const newApplication = new Application({
                jobId,
                userId,
            });

            const savedApplication = await newApplication.save();

            // if the userId is already in the job's applicants array, return an error
            const job = await Job.findById(jobId);

            if (job.applicants.includes(userId)) {
                return res.status(400).json({
                    message: 'You have already applied for this job'
                });
            }

            // push the userId to the job's applicants array
            await Job.findByIdAndUpdate(jobId, {
                $addToSet: { applicants: userId }
            }, {
                new: true
            });

            return res.status(201).json({
                message: 'Job application successful'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Apply job failed',
                error: error.message
            });
        }
    },
    getApplicationById: async (req, res) => {
        try {
            const { id } = req.params;

            const application = await Application.findById(id);

            if (!application) {
                return res.status(404).json({
                    message: 'Application not found'
                });
            }

            return res.status(200).json(application);
        } catch (error) {
            return res.status(500).json({
                message: 'Get application by ID failed',
                error: error.message
            });
        }
    },
    updateApplicationById: async (req, res) => {
        try {
            const { id } = req.params;

            const updatedApplication = await Application.findByIdAndUpdate(id, req.body, {
                new: true
            });

            if (!updatedApplication) {
                return res.status(404).json({
                    message: 'Application not found'
                });
            }

            return res.status(200).json(updatedApplication);
        } catch (error) {
            return res.status(500).json({
                message: 'Update application by ID failed',
                error: error.message
            });
        }
    },
    deleteApplicationById: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedApplication = await Application.findByIdAndDelete(id);

            if (!deletedApplication) {
                return res.status(404).json({
                    message: 'Application not found'
                });
            }

            return res.status(200).json({
                message: 'Application deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Delete application by ID failed',
                error: error.message
            });
        }
    },
    getAllApplicationsByJob: async (req, res) => {
        try {
            const { jobId } = req.params;

            const applications = await Job.findById(jobId).populate('applicants');

            if (!applications) {
                return res.status(404).json({
                    message: 'No applications found for this job'
                });
            }

            return res.status(200).json(applications.applicants);
        } catch (error) {
            return res.status(500).json({
                message: 'Get all applications by job failed',
                error: error.message
            });
        }
    }
}

module.exports = applicationController;