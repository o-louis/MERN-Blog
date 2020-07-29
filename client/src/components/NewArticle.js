import React, { useState } from 'react';
import { createArticle } from '../requests';
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../context/auth";

function NewArticle() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
        createArticle({title, description, author: user.name}).then(response => {
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

    if (article) {
        return <Redirect to="/" />
    }

    return (
        <main className="create-article-container">
            <h1>Create an article</h1>
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
    );
}

export default NewArticle;
