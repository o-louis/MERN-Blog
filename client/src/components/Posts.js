import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../requests';
import PostItem from './PostItem';


const Posts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPosts()
            .then(articles => {
                setData(articles.data);
            });
    }, []);

    return (
        <main className="posts-container">
            <h1 className="posts-container-title">
                Our latest news, updates, and stories
            </h1>
            <div className="posts-container-list">
                {
                    data.map((item, index) =>  {
                        return <PostItem item={{value: item ,index}} key={index} />
                    })
                }
            </div>
        </main>
    );
}

export default Posts;
