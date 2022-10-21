import axios from 'axios';

export const getFaqs = () => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'get',
    url: 'faq',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getFaqDetail = (faqId: string) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'get',
    url: `faq/detail/${faqId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createFaq = (faqId: string, faqObj: any) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'post',
    url: `faq/conversation/${faqId}`,
    data: faqObj,
    headers: {
      ContentType: 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
};
