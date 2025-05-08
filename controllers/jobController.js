const Job = require('../models/job');

const jobController = {
    createJob: async (req, res) => {
        try {
            const { title, description, companyId } = req.body;

            if (!title || !description || !companyId) {
                return res.status(400).json({ message: 'Title, description, companyId are required' });
            }

            const newJob = new Job({
                title,
                description,
                postedBy: req.userId,
                company: companyId,
            });

            const savedJob = await newJob.save();

            if (!savedJob) {
                return res.status(500).json({ message: 'Failed to create job' });
            }

            return res.status(201).json({
                message: 'Job created successfully'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Creating job failed', error: error.message });
        }
    },
    getAllJobs: async (req, res) => {
        try {
            const jobs = await Job.find().populate('postedBy', 'name').populate('company', 'name');

            if (!jobs || jobs.length === 0) {
                return res.status(404).json({ message: 'No jobs found' });
            }

            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ message: 'Fetching jobs failed', error: error.message });
        }
    },
    getJobById: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id).populate('postedBy', 'name').populate('company', 'name');

            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            return res.status(200).json(job);
        } catch (error) {
            return res.status(500).json({ message: 'Fetching job failed', error: error.message });
        }
    },
    updateJobById: async (req, res) => {
        try {
            const { title, description } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: 'Title and description are required' });
            }

            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id,
                { title, description },
                { new: true }
            );

            if (!updatedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }

            return res.status(200).json({
                message: 'Job updated successfully',
                job: updatedJob
            });
        } catch (error) {
            return res.status(500).json({ message: 'Updating job failed', error: error.message });
        }
    },
    deleteJobById: async (req, res) => {
        try {
            const deletedJob = await Job.findByIdAndDelete(req.params.id);

            if (!deletedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }

            return res.status(200).json({
                message: 'Job deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Deleting job failed', error: error.message });
        }
    }
}

module.exports = jobController;