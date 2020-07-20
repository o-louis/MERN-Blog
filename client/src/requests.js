import axios from 'axios';
import * as Constants from './constants';

export const fetchPosts = async () => {
    return await axios(Constants.GET_ARTICLES);
};

export const fetchArticle = async (id) => {
    return await axios(Constants.GET_ARTICLE+id);
};