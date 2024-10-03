import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productMessage: undefined | string;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }
  deleteProduct(id: string) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.getProductList();
      }
    });
    setTimeout(() => {
      this.productMessage = '';
    }, 3000);
  }
  getProductList() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
