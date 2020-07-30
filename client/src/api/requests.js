import axios from 'axios';
import * as Constants from '../utils/constants';

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

export const deleteArticle = async (id) => {
  const article = Constants.REQUEST.DELETE_ARTICLE + id;
  return axios.delete(article)
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}

export const editArticle = async ({title, description, id}) => {
  const article = Constants.REQUEST.EDIT_ARTICLE + id;
  return axios.put(article, {
      title,
      description
    })
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    });
}