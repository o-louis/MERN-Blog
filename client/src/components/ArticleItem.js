import React from 'react';
import { convertDate } from '../tools';
import marked from 'marked';

function ArticleItem(props) {
    const {
        title,
        date,
        description,
        author
    } = props.data;
        
    const descriptionRendered = () => {
        if (description) {
            const markedRender = marked(description, {breaks: true});
            return (
                <p className="article-description" dangerouslySetInnerHTML={{__html: markedRender}} />
            )
        }
    }

    return (
        <main>
            <div className="article-container">
                <h1 className="article-title">{title}</h1>

                <p className="article-date">
                    { convertDate(date) }   
                </p>

                { descriptionRendered() }

                <p className="article-author">
                    { author }
                </p>
            </div>
        </main>
    );
}

export default ArticleItem;
