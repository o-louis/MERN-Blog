const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

// POST
router.post("/add", (req, res) => {
    const { title, description, author} = req.body;

    if (!title || !description) {
        return res.send({
            success: false,
            message: "Fields are not all filled"
        });
    }

    const newArticle = new Article({
        title,
        description,
        author
    });

    newArticle.save();
    res.send({
        success: true,
        article: newArticle
    });
});

module.exports = router;