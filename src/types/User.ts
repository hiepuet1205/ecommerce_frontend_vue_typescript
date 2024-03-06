export interface User {
  id: number;
  name: string,
  email: string,
  avatar?: string,
  phone?: string,
  address?: string,
  city?: string,
  role: string,
  isAdmin?: boolean,
  createdAt?: string,
  updatedAt?: string,
}