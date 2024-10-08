import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        this.searchResult = result;
        if (result.length > 5) {
          result.length = 5;
        }
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
}
