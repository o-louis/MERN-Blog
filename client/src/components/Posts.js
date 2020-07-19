import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'http://localhost:8080/articles',
            );
            setData(result.data);
        };
        fetchData();
    });

    function croppedText(text) {
        return text.length > 150 ? text.substring(0, 150) + "..." : text;
    }

    function convertDate(date) {
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() < 10 ?  '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-' + date.getDate();
    }

    function renderPostsList() {
        return data.map( (item, index) => (
            <div className="posts-list-item" key={index}>
                <a href={"/articles/" + item._id}>
                    <div className="posts-list-item-img">
                        <img src="./placeholder.jpg" alt="item" />
                    </div>

                    <div className="posts-list-item-infos">
                        <h4 className="posts-list-item-infos-title">{item.title}</h4>
                        <p className="posts-list-item-infos-description">
                            {croppedText(item.description)}
                        </p>
                    </div>

                    <div className="posts-list-item-signature">
                        <p className="posts-list-item-signature-date">{convertDate(item.date)}</p>
                        <p className="posts-list-item-signature-author">{item.author}</p>
                    </div>
                </a>
            </div>
        ))
    }

    return (
        <main >
            <h2>Our latest news, updates, and stories for developers</h2>
            <div className="posts-list-container">
                { renderPostsList() }
            </div>
        </main>
    );
}

export default Posts;
