import React from 'react'

const ArticleForm = (props) => {
    const { title, description, error, mainTitle, image, buttonText } = props;
    const { handleSubmit, setTitle, setDescription, setImage } = props;

    return (
        <main className="create-article-container">
            <h1>{mainTitle}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <input
                    type="text"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter a cover image"
                />

                <textarea 
                    id="editor"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter text..."
                />

                {error && <p>{error}</p>}
                <button>{buttonText}</button>
            </form>
        </main>
    )
}

export default ArticleForm
