import axios from 'axios';

export const createAnswer = (data) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: '/quizanswer',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateAnswer = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'put',
    url: `/quizanswer/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
