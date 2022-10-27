import axios from 'axios';

export const createCategory = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/categories/',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateCategory = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/categories/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteCategory = (id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/categories/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};