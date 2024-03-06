import axios from "axios";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

export const getAllType = async (page?: number, limit?: number) => {
  const response = await axios.get(`types`, {
    params: {
      page: page,
      limit: limit
    }
  });

  return response.data.data;
};

export const createType = async (name: string) => {
  await axios.post(`types`, { name }, {
    headers: {
      'Authorization': `Bearer ${authStore.getToken}`
    }
  })
}

export const updateType = async (id: number, name: string) => {
  await axios.put(`types/${id}`, { name }, {
    headers: {
      'Authorization': `Bearer ${authStore.getToken}`
    }
  })
}

export const deleteType = async (id: number) => {
  await axios.delete(`types/${id}`, {
    headers: {
      'Authorization': `Bearer ${authStore.getToken}`
    }
  })
}