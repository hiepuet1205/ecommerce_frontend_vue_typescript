import axios from "axios";
import { useAuthStore } from "../store/auth";
import { Order } from "../types/Product";

const authStore = useAuthStore();

export const createOrder = async (data: Order) => {
  await axios
    .post('orders', data, {
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

export const getOrderOfUser = async () => {
  try {
    const response = await axios.get(`orders/`, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const cancelOrder = async (id: string) => {
  await axios
    .delete(`orders/${id}`, {
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