import axios from 'axios';
import { UserInput } from 'src/interfaces/User';

export const login = (data: UserInput) => {
  return axios.post('auth/login', data);
};
