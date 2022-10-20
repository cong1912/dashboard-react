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

export const updateLecture = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/post/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
