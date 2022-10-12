import axios, { AxiosResponse } from 'axios';

// Get data form server
export const getData = async <T>(url: string): Promise<T> => {
  const res = await axios.get<T>(url);
  return res.data;
};
