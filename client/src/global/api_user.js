import axios from 'axios';
import * as query from './queryUtils';

export const createUser = async (data) => {
    const { name, email, password, passwordConfirm } = data;
    return axios.post(query.REGISTER, {
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
};

export const login = async (data) => {
    const { email, password } = data;
    return axios.post(query.LOGIN, {
        email,
        password
    })
    .then((response) => {
        return response;
    }, (error) => {
        return error;
    });
};

export const getUserInfos = async (token) => {
    return axios.get(query.GET_INFOS, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        })
        .then((response) => {
        return response;
        }, (error) => {
        return error;
        });
};