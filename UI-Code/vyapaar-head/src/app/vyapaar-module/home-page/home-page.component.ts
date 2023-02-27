import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  images: any[]
  products: any[]
  constructor() { }


  ngOnInit(): void {

    this.products = [    { name: 'Product 1', description: 'This is product 1', price: 100, image: 'https://picsum.photos/200/300' },    { name: 'Product 2', description: 'This is product 2', price: 200, image: 'https://picsum.photos/200/300' },    { name: 'Product 3', description: 'This is product 3', price: 300, image: 'https://picsum.photos/200/300' },    { name: 'Product 4', description: 'This is product 4', price: 400, image: 'https://picsum.photos/200/300' },    { name: 'Product 5', description: 'This is product 5', price: 500, image: 'https://picsum.photos/200/300' }  ];
    

    this.images = [
     {src: "https://i.pinimg.com/originals/b3/9f/d8/b39fd8fd5ac2e8c25938e2fd1783d016.jpg",
     alt: "test"},
     {
      src: "https://i.pinimg.com/originals/b3/9f/d8/b39fd8fd5ac2e8c25938e2fd1783d016.jpg",
      alt: "test"
     } 
    ]
  }

  currentSlide = 0;

  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.images.length - 1;
    } else {
      this.currentSlide--;
    }
    console.log(this.currentSlide)
  }

  nextSlide() {
    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    console.log(this.currentSlide)
  }


}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-list',
//   template: `
//     <h2>Products</h2>
//     <div class="product-list-container">
//       <div class="product-list">
//         <div class="product-card" *ngFor="let product of products">
//           <div class="product-image">
//             <img [src]="product.image" [alt]="product.name">
//           </div>
//           <div class="product-name">{{ product.name }}</div>
//           <div class="product-description">{{ product.description }}</div>
//           <div class="product-price">{{ product.price }}</div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .product-list-container {
//       overflow-x: scroll;
//       white-space: nowrap;
//     }
    
//     .product-list {
//       display: inline-block;
//     }
    
//     .product-card {
//       display: inline-block;
//       width: 300px;
//       height: 400px;
//       margin: 10px;
//       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//       border-radius: 5px;
//       overflow: hidden;
//     }
    
//     .product-image {
//       height: 200px;
//       background-color: lightgray;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
    
//     .product-image img {
//       max-width: 100%;
//       max-height: 100%;
//     }
    
//     .product-name {
//       background-color: lightgray;
//       padding: 10px;
//       text-align: center;
//       font-size: 18px;
//     }
    
//     .product-description {
//       padding: 10px;
//       text-align: center;
//     }
    
//     .product-price {
//       background-color: lightgray;
//       padding: 10px;
//       text-align: center;
//       font-size: 18px;
//     }
//   `]
// })
// export class HomePageComponent {
//   products = [    { name: 'Product 1', description: 'This is product 1', price: 100, image: 'https://picsum.photos/200/300' },    { name: 'Product 2', description: 'This is product 2', price: 200, image: 'https://picsum.photos/200/300' },    { name: 'Product 3', description: 'This is product 3', price: 300, image: 'https://picsum.photos/200/300' },    { name: 'Product 4', description: 'This is product 4', price: 400, image: 'https://picsum.photos/200/300' },    { name: 'Product 5', description: 'This is product 5', price: 500, image: 'https://picsum.photos/200/300' }  ];
// }
