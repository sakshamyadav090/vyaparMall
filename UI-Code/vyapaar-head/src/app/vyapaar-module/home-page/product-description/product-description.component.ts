import { Component } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent {
  product = {
    name: 'Europa Disc Padlock P390 SS',
    price: '₹ 975',
    description: 'The Europa Disc Padlock P390 SS is a high-quality padlock with a stainless steel body and shackle.'
  };

  addToCart() {
    console.log('Added to cart');
  }
}
