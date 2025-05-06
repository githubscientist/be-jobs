const express = require('express');
const { applyJob, getApplicationById, updateApplicationById, deleteApplicationById, getAllApplicationsByJob } = require('../controllers/applicationController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

const applicationRouter = express.Router();

/*
    /applications
    - to apply for a job (user) - POST /:jobId
    - to get an application by ID (recruiter, admin) - GET /:id
    - to update an application by ID (recruiter, admin) - PUT /:id
    - to delete an application by ID (recruiter, admin) - DELETE /:id
    - to get all applications for a job (recruiter, admin) - GET /job/:jobId
*/

applicationRouter.post('/:jobId', verifyToken, allowRoles(['user', 'admin']), applyJob);
applicationRouter.get('/:id', verifyToken, allowRoles(['recruiter', 'admin']), getApplicationById);
applicationRouter.put('/:id', verifyToken, allowRoles(['recruiter', 'admin']), updateApplicationById);
applicationRouter.delete('/:id', verifyToken, allowRoles(['recruiter', 'admin']), deleteApplicationById);
applicationRouter.get('/job/:jobId', verifyToken, allowRoles(['recruiter', 'admin']), getAllApplicationsByJob);

module.exports = applicationRouter;