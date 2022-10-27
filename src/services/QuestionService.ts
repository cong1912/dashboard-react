import axios from 'axios';

export const createQuestion = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/question',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateQuestion = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/question/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteQuestion = (id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/courses/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
