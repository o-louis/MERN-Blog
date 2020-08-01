import React from 'react';
import { convertDate, truncateText } from '../global/tools';
import marked from 'marked';

const PostItem = (props) => {

    const LIMIT_TITLE = 100;
    const LIMIT_DESCRIPTION = 145;

    const {
        _id,
        title,
        description,
        date,
        author
    } = props.item.value;

    const { index } = props.item;

    const descriptionRendered = () => {
        if (description) {
            const markedRender = marked(description, {breaks: true});
            return (
                <p 
                    className="posts-list-item-infos-description"
                    dangerouslySetInnerHTML={{
                        __html: truncateText(markedRender, LIMIT_DESCRIPTION)
                    }}
                />
            )
        }
        return truncateText(description, LIMIT_DESCRIPTION);
    }

    return (
        <div className="posts-list-item" key={index}>
            <a href={"/article/" + _id}>
                <div className="posts-list-item-img">
                    <img id="image" src={"./assets/images/image"+index+".jpg"} alt="unsplash" />
                </div>

                <div className="posts-list-item-infos">
                    <h4 className="posts-list-item-infos-title">
                        { truncateText(title, LIMIT_TITLE) }
                    </h4>
                    { descriptionRendered() }
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
