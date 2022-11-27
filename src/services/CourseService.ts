import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token') || 'null');
export const createCourse = (data) => {
  return axios({
    method: 'post',
    url: '/courses',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateCourse = (data, id) => {
  return axios({
    method: 'put',
    url: `/courses/${id}`,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteCourse = (id) => {
  return axios({
    method: 'delete',
    url: `/courses/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
