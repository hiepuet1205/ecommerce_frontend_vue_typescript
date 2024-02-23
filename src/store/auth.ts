import { defineStore } from 'pinia'
import {} from "pinia-plugin-persistedstate";

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => {
    return {
      token: '',
      isAuthenticated: false
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      this.isAuthenticated = true;
    },
    logoutHandle() {
      this.token = ''
      this.isAuthenticated = false
    }
  },
  getters: {
    getToken: state => state.token,
    getIsAuthenticated: state => state.isAuthenticated
  },
  persist: true
})