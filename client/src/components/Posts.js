import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../requests';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

import { AuthContext } from "../context/auth";


const Posts = () => {
    const [data, setData] = useState([]);
    const { isLoggedIn } = React.useContext(AuthContext);

    useEffect(() => {
        fetchPosts()
            .then(articles => {
                setData(articles.data);
            });
    }, []);

    return (
        <main className="posts-container">
            <div className="header">
                <h1 className="posts-container-title">
                    Our latest news, updates, and stories
                </h1>

                { isLoggedIn &&
                    <Link to="/add/article" className="addArticle">
                        <span className="tablet-laptop">Create a new article</span>
                        <span className="mobile">+</span>
                    </Link>
                }
                
            </div>
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
