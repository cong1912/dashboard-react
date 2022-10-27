import axios from 'axios';

export const createCategoryArticle = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/article_category/',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateCategoryArticle = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/article_category/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteCategoryArticle = (id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/article_category/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};