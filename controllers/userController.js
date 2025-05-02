const User = require('../models/user');

const userController = {
    getUser: async (req, res) => {
        try {
            // get the userId from the request object
            const userId = req.userId;

            // find the user in the database
            const user = await User.findById(userId).select('-password -__v');

            // if user not found, return 404
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // return the user data
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateUser: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllUsers: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateUserById: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUserById: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteUserById: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

module.exports = userController;