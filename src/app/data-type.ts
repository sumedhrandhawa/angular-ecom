export interface SignUp {
  name: string;
  password: string;
  email: string;
}
export interface Login {
  password: string;
  email: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity: undefined | number;
}
