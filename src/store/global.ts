import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
  id: 'global-store',
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
