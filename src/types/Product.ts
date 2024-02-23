export interface Product {
  id: number;
  productImage: string;
  productSmallImages: Array<string>;
  logoImage: string;
  brand: string;
  price: number;
  quantitySold: number;
  rating: number;
  title: string;
}

export interface ProductData {
  id: number;
  name: string;
  image: string;
  type: string;
  price: number;
  countInStock: number;
  rating: number;
  description: string;
  discount: number;
  selled: number;
}

export interface OrderProduct extends ProductData {
  amount: number;
  selected: boolean;
}