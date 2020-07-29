import axios from 'axios';
import * as Constants from './constants';

export const fetchPosts = async () => {
    return await axios(Constants.REQUEST.ARTICLES);
};

export const fetchArticle = async (id) => {
    return await axios(`${Constants.REQUEST.ARTICLES}/${id}`);
};

export const createUser = async (data) => {
    const { name, email, password, passwordConfirm } = data;
    return axios.post(Constants.REQUEST.REGISTER, {
        name,
        email,
        password,
        passwordConfirm
      })
      .then((response) => {
        return response;
      }, (error) => {
        return error
      });
}

export const login = async (data) => {
  const { email, password } = data;
  return axios.post(Constants.REQUEST.LOGIN, {
      email,
      password
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}

export const createArticle = async (data) => {
  const { title, description, author } = data;
  return axios.post(Constants.REQUEST.CREATE_ARTICLE, {
      title,
      description,
      author,
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}

export const getInfos = async (token) => {
  return axios.get(Constants.REQUEST.GET_INFOS, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}