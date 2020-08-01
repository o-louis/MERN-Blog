import React, { useState } from 'react';
import { convertDate } from '../global/tools';
import { deleteArticle } from '../global/api_article';
import marked from 'marked';
import { Redirect } from 'react-router';
import { AuthContext } from "../context/auth";

const ArticleItem = (props) => {
    const { isLoggedIn, user } = React.useContext(AuthContext);
    const {
        title,
        date,
        description,
        author,
        image,
        _id
    } = props.data;

    return (
        <main>
            <div className="article-container">

                <p className="article-date">
                    { convertDate(date) }
                </p>
                <div className="article-image">
                    <h1 className="article-title">{title}</h1>
                    <img src={image} alt={title} />
                </div>

                <div className="article-description">
                    { isLoggedIn && user.name === author &&
                        <UserAction id={_id} title={title} description={description} image={image} />
                    }
                    <Description text={description} />
                </div>

                <p className="article-author">
                    { author }
                </p>
            </div>
        </main>
    );
}

const Description = ({text}) => {
    if (text) {
        const markedRender = marked(text, {breaks: true});
        return <p dangerouslySetInnerHTML={{__html: markedRender}} />
    }
    return <React.Fragment></React.Fragment>;
}

const UserAction = ({ id, title, description, image }) => {
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    const handleDelete = () => {
        deleteArticle(id)
            .then(() => setDeleted(true))
            .catch(err => console.log(err));
    }

    if (edited) {
        var article = `/edit/article/${id}`;
        return (
            <Redirect to={{
                pathname: article,
                state: {titleArticle: title, descriptionArticle: description, imageArticle: image}
            }} />
        )
    }

    if (deleted) {
        return <Redirect to="/" />
    }

    return (
        <div className="article-btn-actions">
            <button className="edit" onClick={() => setEdited(true)}>Edit</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ArticleItem;
