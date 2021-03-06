import React, { useState, useEffect } from 'react';
import ArticleForm from "../components/ArticleForm";
import { editArticle, fetchArticle } from '../global/api_article';
import { Redirect } from 'react-router';
import Loader from 'react-loader-spinner';

const EditArticle = (props) => {
    const id = props.match.params._id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const [article, setArticle] = useState(false);

    useEffect(()=> {
        const titleArticle = props.location ? props.location.state.titleArticle : "";
        const descriptionArticle = props.location ? props.location.state.descriptionArticle : "";
        const imageArticle = props.location ? props.location.state.imageArticle : "";

        if (!titleArticle || !descriptionArticle) {
            fetchArticle(id)
                .then(response => {
                    setArticleInfos(response.data.title, response.data.description, response.data.image);
                }).catch(err => console.log(err));
        } else {
            setArticleInfos(titleArticle, descriptionArticle, imageArticle);
        }
    }, [id, props.location]);


    const setArticleInfos = (titleArticle, descriptionArticle, imageArticle) => {
        setTitle(titleArticle);
        setDescription(descriptionArticle);
        setImage(imageArticle)
        setIsLoaded(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError("Please field all inputs");
            return;
        }
        setError("");
        editArticle({title, description, image, id})
            .then(response => {
                console.log(response);
                if (response.data) {
                    console.log("heeeeeey");
                    if (response.data.success) {
                        console.log("SUCEESSS");
                        setArticle(true);
                        setIsLoaded(true);
                    } else {
                        setError(response.data.message);
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
            image={image}
            error={error}
            mainTitle="Edit your article"
            handleSubmit={handleSubmit}
            setTitle={setTitle}
            setImage={setImage}
            setDescription={setDescription}
            buttonText="Edit"
        />
    )
}

export default EditArticle;
