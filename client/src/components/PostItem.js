import React from 'react';
import { convertDate, truncateText } from '../tools';
import * as Constants from '../constants';

const PostItem = (props) => {
    const {
        _id,
        title,
        description,
        date,
        author
    } = props.item.value;

    const { index } = props.item;

    return (
        <div className="posts-list-item" key={index}>
            <a href={"/article/" + _id}>
                <div className="posts-list-item-img">
                    <img id="image" src={"./image"+index+".jpg"} alt="unsplash" />
                </div>

                <div className="posts-list-item-infos">
                    <h4 className="posts-list-item-infos-title">
                        { truncateText(title, Constants.LIMIT_TITLE) }
                    </h4>
                    <p className="posts-list-item-infos-description">
                        { truncateText(description, Constants.LIMIT_DESCRIPTION) }
                    </p>
                </div>

                <div className="posts-list-item-signature">
                    <p className="posts-list-item-signature-date">
                        { convertDate(date) }
                    </p>
                    <p className="posts-list-item-signature-author">{author}</p>
                </div>
            </a>
        </div>
    );
}

export default PostItem;
