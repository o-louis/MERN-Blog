import axios from 'axios';
import * as Constants from './constants';

export const fetchPosts = async () => {
    return await axios(Constants.GET_ARTICLES);
};

export const fetchArticle = async (id) => {
    return await axios(`${Constants.GET_ARTICLES}/${id}`);
};

export const createUser = async (data) => {
    const { name, email, password, passwordConfirm } = data;
    return axios.post(Constants.CREATE_USER, {
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
  return axios.post(Constants.LOGIN, {
      email,
      password
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}