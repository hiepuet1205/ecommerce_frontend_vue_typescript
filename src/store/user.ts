import { defineStore } from 'pinia';
import { User } from '../types/User';
import { } from "pinia-plugin-persistedstate";

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      user: null as User | null
    }
  },
  actions: {
    setUser(userInfo: User): void {
      this.user = userInfo
    },
    removeUser(): void {
      this.user = null
    }
  },
  getters: {
    getUser: state => state.user
  },
  persist: true
})
