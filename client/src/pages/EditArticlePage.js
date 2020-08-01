import React, { useState, useEffect } from 'react';
import ArticleForm from "../components/ArticleForm";
import { editArticle, fetchArticle } from '../global/api_article';
import { Redirect } from 'react-router';
import Loader from 'react-loader-spinner';

const EditArticle = (props) => {
    const id = props.match.params._id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const [article, setArticle] = useState(false);

    useEffect(()=> {
        const titleArticle = props.location ? props.location.state.titleArticle : "";
        const descriptionArticle = props.location ? props.location.state.descriptionArticle : "";

        if (!titleArticle || !descriptionArticle) {
            fetchArticle(id)
                .then(response => {
                    setArticleInfos(response.data.title, response.data.description);
                }).catch(err => console.log(err));
        } else {
            setArticleInfos(titleArticle, descriptionArticle);
        }
    }, [id, props.location]);


    const setArticleInfos = (titleArticle, descriptionArticle) => {
        setTitle(titleArticle);
        setDescription(descriptionArticle);
        setIsLoaded(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError("Please field all inputs");
            return;
        }
        setError("");
        editArticle({title, description, id})
            .then(response => {
                if (response.data) {
                    if (response.success) {
                        setArticle(true);
                    } else {
                        setError(response.message);
                    }
                }
            }).catch(error => console.log(error));
    };

    if (!isLoaded) {
        const styleLoader = {
            color: "#00BFFF",
            height: "50",
            width: "50"
        }
        return <Loader type="Oval" style={styleLoader} />
    }

    if (article) {
        const article = `/article/${id}`;
        return <Redirect to={article} />
    }

    return (
        <ArticleForm 
            title={title}
            description={description}
            error={error}
            mainTitle="Edit your article"
            handleSubmit={handleSubmit}
            setTitle={setTitle}
            setDescription={setDescription}
        />
    )
}

export default EditArticle;
