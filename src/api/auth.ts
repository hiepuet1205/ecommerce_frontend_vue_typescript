import axios from "axios";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

export const logout = async () => {
  try {
    await axios.post(`auth/logout`, null, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`auth/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = response.data;
    authStore.setToken(data.access_token);
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (email: string, password: string) => {
  try {
    await axios.post(`users/sigup`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
  }
};