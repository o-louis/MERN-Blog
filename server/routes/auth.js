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
    const token = authorization && authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    User.findOne({
        _id: decoded._id
    }).then(user => {
        if (user) {
            res.send({
                success: true,
                infos: user
            });
        } else {
            res.send({
                success: false,
                message: 'User does not exist'
            });
        }
    }).catch(err => res.status(400).json("Error: " + err));
});


// POST
router.post("/register", (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    
    if (!name || !email || !password || !passwordConfirm) {
        return res.send({
            success: false,
            message: "Fields are not all filled"
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

            newUser.save();
            res.send({
                success: true,
                message: "User is registered successfully"
            });
        }
    }).catch(err => res.status(400).json("Error: " + err));
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        email: email.toLowerCase()
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, passwordsMatch) => {
                if (err) {
                    res.send({
                        success: false,
                        error: err
                    });
                    throw err;
                    return;
                }

                if (passwordsMatch) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }

                    let token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        }
                    );
                    res.send({
                        success: true,
                        token: token
                    });
                } else {
                    res.send({ 
                        success: false,
                        message: 'Password incorrect'
                    });
                }
            });
        } else {
            res.send({
                success: false,
                message: 'User does not exist'
            });
        }
    }).catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;