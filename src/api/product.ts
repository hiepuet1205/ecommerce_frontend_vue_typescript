import axios from "axios";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

export const getProduct = async (id: number) => {
  try {
    const response = await axios.get(`products/${id}`, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`products`, {
      params: {
        page: page,
        limit: limit
      },
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    });

    const data = response.data;

    if (data.data.length === 0) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const createProduct = async (data: FormData) => {
  await axios
    .post('products', data, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    })
    .then(response => {
      console.log('Create Successfully!', response);
    })
    .catch(error => {
      console.error('Create error!', error);
    });
}

export const updateProduct = async (id: number, data: FormData) => {
  await axios
    .patch(`product/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    })
    .then(response => {
      console.log('Update Successfully!', response);
    })
    .catch(error => {
      console.error('Update error!', error);
    });
}

export const deleteProduct = async (id: number) => {
  await axios
    .delete(`products/${id}`, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    })
    .then(response => {
      console.log('Delete Successfully!', response);
    })
    .catch(error => {
      console.error('Delete error!', error);
    });
}