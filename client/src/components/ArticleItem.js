import React, { useState } from 'react';
import { convertDate } from '../utils/tools';
import { deleteArticle } from '../api/requests';
import marked from 'marked';
import { Redirect } from 'react-router';
import { AuthContext } from "../context/auth";

const Description = ({text}) => {
    if (text) {
        const markedRender = marked(text, {breaks: true});
        return <p dangerouslySetInnerHTML={{__html: markedRender}} />
    }

    return <React.Fragment></React.Fragment>;
}

const UserAction = ({ id, title, description }) => {
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    const handleDelete = () => {
        deleteArticle(id).then(() => {
            setDeleted(true);
        }).catch(err => console.log(err));
    }

    if (edited) {
        var article = `/edit/article/${id}`;
        return (
            <Redirect to={{
                pathname: article,
                state: {titleArticle: title, descriptionArticle: description}
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

function ArticleItem(props) {

    const { isLoggedIn, user } = React.useContext(AuthContext);

    const {
        title,
        date,
        description,
        author,
        _id
    } = props.data;

    return (
        <main>
            <div className="article-container">
                <h1 className="article-title">{title}</h1>

                <p className="article-date">
                    { convertDate(date) }   
                </p>

                <div className="article-description">
                    { isLoggedIn && user.name === author &&
                        <UserAction id={_id} title={title} description={description} />
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

export default ArticleItem;
