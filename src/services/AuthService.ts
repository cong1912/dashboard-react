import axios from 'axios';
import { UserInput } from 'src/interfaces/User';

export const login = (data: UserInput) => {
  return axios({
    method: 'post',
    url: '/auth/login',
    data: data,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
};
