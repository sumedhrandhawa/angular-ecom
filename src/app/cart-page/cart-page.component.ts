import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: undefined | Cart[];
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService) {
    this.product.currenCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      console.log(this.priceSummary);
    });
  }
}
