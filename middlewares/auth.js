const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const auth = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.token || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // verify the token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // attach user to request
        req.userId = decodedToken.id;

        next();
    },
    allowRoles: (roles) => {
        return (req, res, next) => {
            if (!req.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // get the userId from the request
            const userId = req.userId;

            // get the user from the database
            const user = User.findById(userId);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // check if the user has the required role
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        }
    }
}

module.exports = auth;