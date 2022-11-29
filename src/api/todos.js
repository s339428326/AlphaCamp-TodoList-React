import axios from 'axios';

const port = 3001;
const BASE_URL = `http://localhost:${port}`;
const TODOS_URL = BASE_URL + '/todos/';

export const getTodos = async () => {
  try {
    const res = await axios.get(TODOS_URL);
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
    const res = await axios.post(TODOS_URL, {
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
    const res = await axios.patch(TODOS_URL + id, {
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
    const res = await axios.delete(TODOS_URL + id);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]', error);
  }
};
