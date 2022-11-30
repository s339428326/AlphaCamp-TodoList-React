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
