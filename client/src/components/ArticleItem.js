import React from 'react';
import { convertDate } from '../tools';

function ArticleItem(props) {
    const {
        title,
        date,
        description,
        author
    } = props.data;
    
    return (
        <main>
            <div className="article-container">
                <h1>{title}</h1>

                <p className="article-date">
                    { convertDate(date) }
                </p>
                <p className="article-description">
                    { description }
                </p>
                <p className="article-author">
                    { author }
                </p>
            </div>
        </main>
    );
}

export default ArticleItem;
