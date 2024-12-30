import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}
  //TODO add client
  ngOnInit(): void {
    this.http.get('assets/data.json').subscribe({
      next: (data: any) => {
        this.products = data;
        console.log('Products to load', data);
      },
      error: (error) => {
        console.error('Error loading products', error);
      },
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
