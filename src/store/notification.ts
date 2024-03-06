import { defineStore } from 'pinia';
import { useGlobalStore } from './global';

const globalStore = useGlobalStore();

export const useNotifyStore = defineStore({
  id: 'notify-store',
  state: () => {
    return {
      isShow: false,
      isError: false,
      message: ''
    }
  },
  actions: {
    setShowNotify(isError: boolean, message: string): void {
      this.isShow = true;
      this.isError = isError;
      this.message = message;
      globalStore.setShowModal(true);

      setTimeout(() => {
        this.isShow = false;
        globalStore.setShowModal(false);
      }, 500)
    },
  },
  getters: {
    getNotify: state => {
      return {
        isShow: state.isShow,
        isError: state.isError,
        message: state.message
      }
    }
  },
})
