import { defineStore } from 'pinia';
import { OrderProduct } from '../types/Product';
import { ref } from 'vue';
import { orderConstant } from '../constant';

export const useOrderStore = defineStore({
  id: 'order-store',
  state: () => {
    return {
      orderItems: ref<Array<OrderProduct>>([]),
      isSuccessOrder: false,
      paymentMethod: orderConstant.payments.find(payment => payment.default),
      deliveryMethod: orderConstant.deliveries.find(delivery => delivery.default),
    }
  },
  actions: {
    addOrderProduct(product: OrderProduct): void {
      const itemOrder = this.orderItems.find(item => item.id === product.id);

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
    toggleSelectedAll(selectAll: boolean): void {
      this.orderItems = this.orderItems.map(item => {
        return {
          ...item,
          selected: selectAll,
        }
      });
    },
    clearSelectedItems(): void {
      this.orderItems = this.orderItems.filter(item => !item.selected);
    },
    changePaymentMethod(paymentMethod: string): void {
      this.paymentMethod = orderConstant.payments.find(payment => payment.value === paymentMethod);
    },
    changeDeliveryMethod(deliveryMethod: string): void {
      this.deliveryMethod = orderConstant.deliveries.find(delivery => delivery.value === deliveryMethod);
    },
  },
  getters: {
    getOrderItems: state => state.orderItems,
    getSelectedItems: state => state.orderItems.filter(item => item.selected),
    getTotal: state => {
      let total = 0;
      const selectedItems = state.orderItems.filter(item => item.selected);
      if (selectedItems) {
        selectedItems.forEach(item => total += (item.amount * item.price));
      }
      return total;
    },
    getSelectedAll: state => {
      const selectedItems = state.orderItems.filter(item => item.selected);
      return selectedItems.length === state.orderItems.length;
    },
    getPaymentMethod: state => state.paymentMethod,
    getDeliveryMethod: state => state.deliveryMethod,
  },
  persist: true
})
