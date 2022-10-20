import axios from 'axios';

export const createSection = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/section',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
