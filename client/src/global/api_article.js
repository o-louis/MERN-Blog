import axios from 'axios';
import * as query from './queryUtils';

export const createArticle = async (data) => {
  const { title, description, image, author } = data;
  return axios.post(query.CREATE_ARTICLE, {
      title,
      description,
      author,
      image
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
};

export const fetchPosts = async () => {
    return await axios(query.ARTICLES);
};

export const fetchArticle = async (id) => {
    return await axios(`${query.ARTICLES}/${id}`);
};

export const editArticle = async ({title, description, image, id}) => {
  const article = query.EDIT_ARTICLE + id;
  return axios.put(article, {
      title,
      description,
      image
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
};

export const deleteArticle = async (id) => {
  const article = query.DELETE_ARTICLE + id;
  return axios.delete(article)
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
};
