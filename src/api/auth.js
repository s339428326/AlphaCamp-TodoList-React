import axios from 'axios';

const AUTH_URL = 'https://todo-list.alphacamp.io/api/auth/';

export const login = async ({ username, password }) => {
  console.log({ username, password });
  try {
    const { data } = await axios.post(AUTH_URL + 'login', {
      username,
      password,
    });

    console.log(data);

    const { authToken } = data;
    if (authToken) return { success: true, ...data };
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(AUTH_URL + 'register', {
      username,
      email,
      password,
    });

    const { authToken } = data;
    if (authToken) return { success: true, ...data };
    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const res = await axios.get(AUTH_URL + 'test-token', {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return res.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]', error);
  }
};
