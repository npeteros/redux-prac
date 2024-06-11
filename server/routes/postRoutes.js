const app = require('express');
const router = app.Router();
const db = require('../db');
const authJWT = require('../middleware')

router.get('/', authJWT, (req, res) => {
    try {
        db.query(`SELECT * FROM posts ORDER BY createdOn ASC`, (err, rows, fields) => {
            res.status(200).send({ rows })
        })
    } catch (error) {
        console.error("Error in retrieving tasks: ", error);
    }
})

router.post('/', authJWT, (req, res) => {
    const { post, user } = req.body
    let userID = user.id
    try {
        db.query(`INSERT INTO posts (userID, post) VALUES (${userID}, '${post}')`, (err, rows, fields) => {
            if (err) return res.status(500).send({ message: 'Error creating post: ' + err });
            if (rows.affectedRows > 0) {
                const newID = rows.insertId;
                db.query(`SELECT * FROM posts WHERE id=${newID}`, (e, results) => {
                    return res.status(201).send(results[0])
                })
            };
        })
    } catch (error) {
        console.error("Error creating post: ", error);
    }
})

router.delete('/', authJWT, (req, res) => {
    const { id } = req.body;
    try {
        db.query(`DELETE FROM posts WHERE id=${id}`, (err, rows, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error deleting post: ' + err });
            }
            return res.status(201).send({ id: id });
        });
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
})

module.exports = router;