
import React, { useState, useEffect } from 'react';

import PostItem from '../components/PostItem';

import { AuthContext } from "../context/auth";
import { fetchPosts } from '../global/api_article';

import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPosts()
            .then(articles => setData(articles.data))
            .catch(error => console.log(error));
    }, []);

    return <Posts data={data} />
};

const Posts = (props) => {
    const { data } = props;
    const { isLoggedIn } = React.useContext(AuthContext);

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
                        return <PostItem item={{value:item, index}} key={index} />
                    })
                }
            </div>
        </main>
    )
}

export default Home;
