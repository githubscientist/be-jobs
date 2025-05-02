const User = require('../models/user');

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // validate input
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            // check if user already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // create new user
            const newUser = new User({
                name, email, password
            });

            // save user to database
            await newUser.save();

            // send response
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Registration failed' });
        }
    },
    login: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Login failed' });
        }
    },
    logout: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: 'Logout failed' });
        }
    },
    me: async (req, res) => {
        try {
            const user = req.user; // Assuming user is set in the request by a middleware
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve user' });
        }
    }
}

module.exports = authController;