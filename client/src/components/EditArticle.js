import React, { useState, useEffect } from 'react';
import { editArticle, fetchArticle } from '../api/requests';
import { Redirect } from 'react-router';

function EditArticle(props) {
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
            fetchArticle(id).then(response => {
                const { title, description } = response.data;
                setInfos(title, description);
            }).catch(err => console.log(err));
        } else {
            setInfos(titleArticle, descriptionArticle);
        }
    }, [id, props.location]);

    const setInfos = (titleArticle, descriptionArticle) => {
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
        editArticle({title, description, id}).then(response => {
            const { data } = response;
            if (data) {
                if (data.success) {
                    setArticle(true);
                } else {
                    setError(data.message);
                }
            }
        });
    };

    if (!isLoaded) {
        return <div>Loading..</div>
    }

    if (article) {
        const article = `/article/${id}`;
        return <Redirect to={article} />
    }

    return (
        <main className="create-article-container">
            <h1>Edit your article</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea 
                    id="editor"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter text..."
                />

                {error && <p>{error}</p>}
                <button>Create</button>
            </form>
        </main>
    )
}

export default EditArticle;
