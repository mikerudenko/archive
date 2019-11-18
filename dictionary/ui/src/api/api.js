import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

const getConfig = () => {
  return {
    headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
  };
};

export const getWords = params =>
  axiosInstance.get('/api/word', {params, ...getConfig()});
export const deleteWord = data =>
  axiosInstance.delete('/api/word', {data, ...getConfig()});
export const updateWord = body =>
  axiosInstance.patch('/api/word', body, getConfig());
export const createWord = body =>
  axiosInstance.post('/api/word', body, getConfig());
export const login = body => axiosInstance.post('/login', body);
