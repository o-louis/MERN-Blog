const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require("../models/User");

router.use(cors());

// GET
router.get('/infos', (req, res) => {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    User.findOne({
        _id: decoded._id
    }).then(user => {
        if (user) {
            res.send(user);
        } else {
            res.send('User does not exist');
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});


// POST
router.post("/register", (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    
    if (!name || !email || !password || !passwordConfirm) {
        return res.send({
            success: false,
            message: "Field are not all filled"
        });
    }
    
    if (password !== passwordConfirm) {
        return res.send({
            success: false,
            message: "Passwords do not match"
        });
    }

    User.findOne({
        email: email.toLowerCase()
    }).then(async (user) => {
        if (user) {
            return res.send({
                success: false,
                message: "User already exists"
            });
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new User({
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            });

            console.log(newUser);
            newUser.save();
            res.send({
                success: true,
                message: "User is registered successfully"
            });
        }
    }).catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        email: email.toLowerCase()
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, passwordsMatch) => {
                if (err) {
                    res.send('error: ' + err);
                    throw err;
                }

                if (passwordsMatch) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }

                    console.log(payload);
                    let token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        }
                    );
                    res.send(token);
                } else {
                    res.send({ error: 'Password incorrect' });
                }
            });
        } else {
            res.send({ error: 'User does not exist' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});




module.exports = router;