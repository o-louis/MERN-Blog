const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

// POST

/* GET ALL ARTICLES*/
router.get("/", (req, res) => {
    Article.find()
        .then((article) => {
            res.send(article);
        }).catch(err => res.status(400).json("Error: "+ err));
});

/* GET ARTICLE */
router.get("/:_id", (req, res) => {
    const { _id } = req.params;
    Article.findById(_id)
        .then((article) => {
            res.send(article);
        }).catch(err => res.status(400).json("Error: "+ err));
});

/* ADD */
router.post("/add", (req, res) => {
    const { title, description, image, author} = req.body;

    if (!title || !description) {
        return res.send({
            success: false,
            message: "Fields are not all filled"
        });
    }
    const defaultImage = "/assets/images/placeholder.png";

    const newArticle = new Article({
        title,
        description,
        image: image || defaultImage,
        author
    });

    newArticle.save();
    res.send({
        success: true,
        article: newArticle
    });
});

/* EDIT */
router.put("/edit/:_id", (req, res) => {

    const { _id } = req.params;
    const { title, description, image } = req.body;

    if (!title || !description) {
        return res.send({
            success: false,
            message: "Fields are not all filled"
        });
    }

    const defaultImage = "/assets/images/placeholder.png";

    const editedArticle = {
        title,
        description,
        image: image || defaultImage,
        date: Date.now()
    };

    Article.findByIdAndUpdate(_id, editedArticle)
        .then(() => {
            res.send({
                success: true,
                message: 'Article is edited successfully'
            });
        }).catch(err => res.status(400).json("Error: "+ err));
});

/* DELETE */
router.delete("/delete/:_id", (req, res) => {
    const { _id } = req.params;

    Article.findByIdAndDelete(_id)
        .then(() => {
            res.send({
                success: true,
                message: 'Article deleted'
            });
        }).catch(err => res.status(400).json("Error: "+ err));
});

module.exports = router;