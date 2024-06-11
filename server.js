require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./server/db');
const authJWT = require('./server/middleware')

const postRoutes = require('./server/routes/postRoutes')
const userRoutes = require('./server/routes/userRoutes')

const app = express();
const config = process.env;

const jwtKey = config.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json())

app.get('/validate', authJWT, (req, res) => {
    res.status(200).send(req.user);
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (err, rows, fields) => {
            if (err) return console.log(err)
            if (rows.length > 0) {
                const verified = bcrypt.compareSync(password, rows[0].password);
                if (verified) {
                    const user = rows[0];
                    const token = jwt.sign({ id: user.id }, jwtKey, { expiresIn: '1h' });
                    res.status(201).send({ token, user })
                } else res.status(401).send({ message: 'Invalid credentials' });
            } else res.status(404).send({ message: 'Invalid credentials' });
        })
    } catch (error) {
        console.error("Error logging in: ", error);
    }
})

app.post('/register', (req, res) => {
    let { username, email, password } = req.body;
    try {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (err, rows, fields) => {
            if (rows.length == 0) {
                password = bcrypt.hashSync(password, 10);
                db.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err, rows, fields) => {
                    if (err) return res.status(500).send({ message: 'Error creating user: ' + err });
                    if (rows.affectedRows > 0) return res.status(201).send({ message: 'Account successfully created' });
                })
            } else return res.status(404).send({ message: 'Account already exists' });
        })
    } catch (error) {
        console.error("Error registering: ", error);
    }
})

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(config.PORT, () => {
    console.log(`App is listening on port ${config.PORT}`)
})