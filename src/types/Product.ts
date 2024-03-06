export interface Product {
  id: number;
  images: Array<string>;
  name: string;
  description: string;
  price: number;
  selled: number;
  countInStock: number;
  rating: number;
  type: string
}

export interface OrderProduct extends Product {
  amount: number;
  selected: boolean;
}

export interface OrderItem {
  productId: number;
  amount: number;
  price: number;
  discount: number;
  image: string;
}

export interface Order {
  orderItems: Array<OrderItem>;
  paymentMethod: string;
  deliveryMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface Type {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}