const app = require('express');
const router = app.Router();
const db = require('../db');
const authJWT = require('../middleware')

router.get('/', authJWT, (req, res) => {
    try {
        db.query(`SELECT * FROM users`, (err, rows, fields) => {
            res.status(200).send({ rows })
        })
    } catch (error) {
        console.error("Error in retrieving tasks: ", error);
    }
})

router.post('/', authJWT, (req, res) => {
    try {
        db.query(`INSERT INTO `)
    } catch (error) {
        
    }
})

module.exports = router;