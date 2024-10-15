import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log(result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
}
