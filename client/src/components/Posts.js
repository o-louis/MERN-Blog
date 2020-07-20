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
        <main >
            <h2>Our latest news, updates, and stories</h2>
            <div className="posts-list-container">
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
