import React, { useState, useEffect } from 'react';

import ArticleItem from '../components/ArticleItem';
import { fetchArticle } from '../global/api_article';

const Article = (props) => {
    const id = props.match.params._id;
    const [data, setData] = useState({});

    useEffect(() => {
        fetchArticle(id)
            .then(article => setData(article.data))
            .catch(error => console.log(error));
    }, [id]);

    return <ArticleItem data={data} />
}

export default Article;