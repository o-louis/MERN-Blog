import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem';
import { fetchArticle } from '../requests';

function Article(props) {
    const id = props.match.params._id;
    const [data, setData] = useState({});

    useEffect(() => {
        fetchArticle(id)
            .then(article => {
                setData(article.data);
            });
    }, [id]);

    return (
        <ArticleItem data={data} />
    );
}

export default Article;