import axios from 'axios';

export const createLecture = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/post',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
