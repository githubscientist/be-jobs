const express = require('express');
const { verifyToken, allowRoles } = require('../middlewares/auth');
const { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, assignRecruiter, removeRecruiter } = require('../controllers/companyController');

const companyRouter = express.Router();

/*
    /companies
    - POST / - Create a new company (admin only)
    - GET / - Get all companies (user, manager, admin)
    - GET /:id - Get company by ID (user, manager, admin)
    - PUT /:id - Update company by ID (admin only)
    - DELETE /:id - Delete company by ID (admin only)
    - to assign a company to a user (admin only) - PUT /:id/assign
    - to remove a company from a user (admin only) - PUT /:id/remove
*/

companyRouter.post('/', verifyToken, allowRoles(['recruiter', 'admin']), createCompany);
companyRouter.get('/', verifyToken, allowRoles(['user', 'manager', 'admin']), getAllCompanies);
companyRouter.get('/:id', verifyToken, allowRoles(['user', 'manager', 'admin']), getCompanyById);
companyRouter.put('/:id', verifyToken, allowRoles(['admin']), updateCompany);
companyRouter.delete('/:id', verifyToken, allowRoles(['admin']), deleteCompany);
companyRouter.put('/:id/assign', verifyToken, allowRoles(['admin']), assignRecruiter);
companyRouter.put('/:id/remove', verifyToken, allowRoles(['admin']), removeRecruiter);

module.exports = companyRouter;