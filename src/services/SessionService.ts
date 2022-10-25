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

export const updateSection = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/section/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteSection = ( id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/section/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};