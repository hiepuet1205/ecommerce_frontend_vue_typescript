import { defineStore } from 'pinia';
import { OrderProduct } from '../types/Product';
import { ref } from 'vue';

export const useOrderStore = defineStore({
  id: 'order-store',
  state: () => {
    return {
      orderItems: ref<Array<OrderProduct>>([]),
      isSuccessOrder: false,
    }
  },
  actions: {
    addOrderProduct(product: OrderProduct): void {
      const itemOrder = this.orderItems.find(item => item === product);

      if (itemOrder && (itemOrder.amount + product.amount) <= itemOrder.countInStock) {
        itemOrder.amount = itemOrder.amount + product.amount;
        this.isSuccessOrder = true;
      } else {
        if (product.amount <= product.countInStock) {
          this.orderItems.push(product);
          this.isSuccessOrder = true;
        }
      }
    },
    increaseAmount(id: number): void {
      const itemOrder = this.orderItems.find(item => item.id === id);

      if (itemOrder && (itemOrder.amount + 1) <= itemOrder.countInStock) {
        itemOrder.amount++;
      }
    },
    decreaseAmount(id: number): void {
      const itemOrder = this.orderItems.find(item => item.id === id);

      if (itemOrder && (itemOrder.amount - 1) >= 0) {
        itemOrder.amount--;
      }
    },
    removeOrderItem(id: number): void {
      this.orderItems = this.orderItems.filter(item => item.id !== id);
    },
    removeManyOrderItem(ids: Array<number>): void {
      this.orderItems = this.orderItems.filter(item => !ids.includes(item.id));
    },
    toggleSelectedOrderItem(id: number): void {
      const itemOrder = this.orderItems.find(item => item.id === id);
      if (itemOrder) {
        itemOrder.selected = !itemOrder.selected;
      }
    },
    caculateTotal(): number {
      let total = 0;
      const selectedItems = this.orderItems.filter(item => item.selected);
      if (selectedItems) {
        selectedItems.forEach(item => total += (item.amount * item.price));
      }
      return total;
    }
  },
  getters: {
    getOrderItems: state => state.orderItems,
    getSelectedItems: state => state.orderItems.filter(item => item.selected),
  },
  persist: true
})
