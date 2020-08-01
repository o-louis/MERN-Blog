import React, { useState } from 'react';
import ArticleForm from "../components/ArticleForm";
import { createArticle } from '../global/api_article';
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../context/auth";

const NewArticle = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [article, setArticle] = useState(false);
    const { user } = React.useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError("Please field all inputs");
            return;
        }

        setError("");
        createArticle({title, description, image, author: user.name})
            .then(response => {
                const { data } = response;
                if (data) {
                    if (data.success) {
                        setArticle(true);
                    } else {
                        setError(data.message);
                    }
                }
            }).catch(error => console.log(error));
    };

    if (article) {
        return <Redirect to="/" />
    }

    return (
        <ArticleForm 
            title={title}
            description={description}
            image={image}
            error={error}
            mainTitle="Write your article"
            handleSubmit={handleSubmit}
            setTitle={setTitle}
            setImage={setImage}
            setDescription={setDescription}
            buttonText="Create"
        />
    );
}

export default NewArticle;
