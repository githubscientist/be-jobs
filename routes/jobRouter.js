const express = require('express');
const { verifyToken, allowRoles } = require('../middlewares/auth');
const { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } = require('../controllers/jobController');

const jobRouter = express.Router();

/*
    /jobs
    - to create a new job (recruiter, admin) - POST /
    - to get all jobs (user, recruiter, admin) - GET /
    - to get a job by ID (user, recruiter, admin) - GET /:id
    - to update a job by ID (recruiter, admin) - PUT /:id
    - to delete a job by ID (recruiter, admin) - DELETE /:id
*/

jobRouter.post('/', verifyToken, allowRoles(['recruiter', 'admin']), createJob);
jobRouter.get('/', verifyToken, allowRoles(['user', 'recruiter', 'admin']), getAllJobs);
jobRouter.get('/:id', verifyToken, allowRoles(['user', 'recruiter', 'admin']), getJobById);
jobRouter.put('/:id', verifyToken, allowRoles(['recruiter', 'admin']), updateJobById);
jobRouter.delete('/:id', verifyToken, allowRoles(['recruiter', 'admin']), deleteJobById);

module.exports = jobRouter;