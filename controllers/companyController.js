const Company = require('../models/company');
const User = require('../models/user');

const companyController = {
    createCompany: async (req, res) => {
        try {
            // get the company data from the request body
            const { name, location } = req.body;

            // check if the company already exists
            const existingCompany = await Company.findOne({ name });

            if (existingCompany) {
                return res.status(400).json({ message: 'Company already exists' });
            }

            // create a new company
            const newCompany = new Company({
                name,
                location,
            });

            // save the company to the database
            await newCompany.save();

            // send the response
            return res.status(201).json({
                message: 'Company created successfully'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating company', error });
        }
    },
    getAllCompanies: async (req, res) => {
        try {
            // get all companies from the database
            const companies = await Company.find();

            // send the response
            return res.status(200).json(companies);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching companies', error });
        }
    },
    getCompanyById: async (req, res) => {
        try {
            // get the company ID from the request parameters
            const { id } = req.params;

            // find the company by ID
            const company = await Company.findById(id);

            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // send the response
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching company', error });
        }
    },
    updateCompany: async (req, res) => {
        try {
            // get the company ID from the request parameters
            const { id } = req.params;

            // get the updated company data from the request body
            const { name, location } = req.body;

            // find the company by ID and update it
            const updatedCompany = await Company.findByIdAndUpdate(id, { name, location }, { new: true });

            if (!updatedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // send the response
            return res.status(200).json(updatedCompany);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating company', error });
        }
    },
    deleteCompany: async (req, res) => {
        try {
            // get the company ID from the request parameters
            const { id } = req.params;

            // find the company by ID and delete it
            const deletedCompany = await Company.findByIdAndDelete(id);

            if (!deletedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // send the response
            return res.status(200).json({ message: 'Company deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting company', error });
        }
    },
    assignRecruiter: async (req, res) => {
        try {
            // get the company ID and recruiter ID from the request parameters
            const { id } = req.params;
            const { recruiterId } = req.body;

            // find the company by ID and update it
            const updatedCompany = await Company.findByIdAndUpdate(id, { $addToSet: { recruiter: recruiterId } }, { new: true });

            if (!updatedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // update the role of the user to recruiter
            await User.findByIdAndUpdate(recruiterId, { role: 'recruiter' }, { new: true });

            // send the response
            return res.status(200).json(updatedCompany);
        } catch (error) {
            return res.status(500).json({ message: 'Error assigning recruiter', error });
        }
    },
    removeRecruiter: async (req, res) => {
        try {
            // get the company ID and recruiter ID from the request parameters
            const { id } = req.params;
            const { recruiterId } = req.body;

            // find the company by ID and update it
            const updatedCompany = await Company.findByIdAndUpdate(id, { $pull: { recruiter: recruiterId } }, { new: true });

            if (!updatedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // update the role of the user to user
            // check if the user is not a recruiter in any other company
            const user = await User.findById(recruiterId);
            const isRecruiterInOtherCompany = await Company.findOne({ recruiter: recruiterId });

            if (!isRecruiterInOtherCompany) {
                // update the role of the user to user
                await User.findByIdAndUpdate(recruiterId, { role: 'user' }, { new: true });
            }

            // send the response
            return res.status(200).json(updatedCompany);
        } catch (error) {
            return res.status(500).json({ message: 'Error removing recruiter', error });
        }
    }
}

module.exports = companyController;