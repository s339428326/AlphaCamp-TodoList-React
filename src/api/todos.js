import axios from 'axios';

const BASE_URL = 'https://todo-list.alphacamp.io/api';
const TODOS_URL = BASE_URL + '/todos/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('authToken');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(TODOS_URL);
    return res.data.data;
  } catch (error) {
    console.log('[Get Todo failed]', error);
  }
};

export const createTodos = async (payload) => {
  if (!payload) {
    console.log('Please createTodos fn parameter');
    return;
  }
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(TODOS_URL, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

export const patchTodos = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(TODOS_URL + id, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.log('[Patch Todo failed]', error);
  }
};

export const deleteTodos = async (id) => {
  try {
    const res = await axiosInstance.delete(TODOS_URL + id);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]', error);
  }
};
