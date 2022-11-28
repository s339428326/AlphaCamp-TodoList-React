import axios from 'axios';

const port = 3001;
const BASE_URL = `http://localhost:${port}`;
const TODOS_URL = BASE_URL + '/todos';
console.log(TODOS_URL);

export const getTodos = async () => {
  try {
    const res = await await axios.get(TODOS_URL);
    return res.data;
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
    const res = axios.post(TODOS_URL, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

export const patchTodos = async (id) => {
  try {
    const res = await await axios.get(TODOS_URL + id);
    return res.data;
  } catch (error) {
    console.log('[Patch Todo failed]', error);
  }
};

export const deleteTodos = async () => {};
