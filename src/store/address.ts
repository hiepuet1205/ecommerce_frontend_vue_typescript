import { defineStore } from 'pinia';
import { } from "pinia-plugin-persistedstate";

export const useAddressStore = defineStore({
  id: 'address-store',
  state: () => {
    return {
      name: '',
      address: '',
      city: '',
      phone: ''
    }
  },
  actions: {
    setAddress(name: string, address: string, city: string, phone: string): void {
      this.name = name;
      this.address = address;
      this.city = city;
      this.phone = phone;
    },
  },
  getters: {
    getAddress: state => {
      return {
        name: state.name,
        address: state.address,
        city: state.city,
        phone: state.phone
      }
    }
  },
  persist: true
})
