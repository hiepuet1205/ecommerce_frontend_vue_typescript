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