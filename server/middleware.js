require('dotenv').config();
const config = process.env;
const jwt = require('jsonwebtoken');

const jwtKey = config.JWT_SECRET;

const authJWT = (req, res, next) => {
    const token = req.header('AuthToken');
    if (!token) return res.status(401).send({ message: 'Access denied' });
    try {
        const verified = jwt.verify(token, jwtKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' })
    }
}

module.exports = authJWT