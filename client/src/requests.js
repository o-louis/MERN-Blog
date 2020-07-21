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
    axios.post(Constants.CREATE_USER, {
        name,
        email,
        password,
        passwordConfirm
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}

export const login = async (data) => {
  const { email, password } = data;
  axios.post(Constants.LOGIN, {
      email,
      password
    })
    .then((response) => {
      console.log(response);
      return response.data;
    }, (error) => {
      console.log(error);
    });
}