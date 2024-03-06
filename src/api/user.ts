import axios from "axios";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

export const getInfo = async () => {
  try {
    const response = await axios.get(`users/info`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.getToken}`
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`users`, {
      params: {
        page: page,
        limit: limit
      },
      headers: {
        'Content-Type': 'application/json',
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

export const createUser = async (data: FormData) => {
  await axios
    .post('users', data, {
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

export const updateUser = async (id: number, data: FormData) => {
  await axios
    .patch(`users/${id}`, data, {
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

export const deleteUser = async (id: number) => {
  await axios
    .delete(`users/${id}`, {
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

export const forgotPassword = async (email: string) => {
  await axios
    .post('users/forgot-password', { email })
    .then(response => {
      console.log('Successfully!', response);
    })
    .catch(error => {
      console.error('Error!', error);
    });
}

export const resetPassword = async (token: string, password: string) => {
  await axios
    .patch(`users/reset-password/${token}`, { password })
    .then(response => {
      console.log('Successfully!', response);
    })
    .catch(error => {
      console.error('Error!', error);
    });
}

export const updatePassword = async (oldPassword: string, newPassword: string, passwordConfirm: string) => {
  await axios
    .put(`users/update-password`, { oldPassword, newPassword, passwordConfirm }, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
    })
    .then(response => {
      console.log('Successfully!', response);
    })
    .catch(error => {
      console.error('Error!', error);
    });
}