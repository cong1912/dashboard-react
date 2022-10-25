import axios from 'axios';
import { UserInput } from 'src/interfaces/User';

export const login = (data: UserInput) => {
  return axios({
    method: 'post',
    url: '/auth/login',
    data: data,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
};

export const changePassword = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: `/users/change_pass/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
