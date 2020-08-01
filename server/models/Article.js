  
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Article = mongoose.model("Article", ArticleSchema, "articles");

module.exports = Article;