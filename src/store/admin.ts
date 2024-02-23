import { defineStore } from 'pinia';

export const useAdminStore = defineStore({
  id: 'admin-store',
  state: () => {
    return {
      isShowModal: false,
    }
  },
  actions: {
    setShowModal(isShowModal: boolean): void {
      this.isShowModal = isShowModal
    },
  },
  getters: {
    getIsShowModal: state => state.isShowModal
  },
})
