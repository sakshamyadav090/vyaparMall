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
     {src: "../../../assets/Images/1.jpg", alt: "test"},
     {src: "../../../assets/Images/3.jpg", alt: "test"},
     {src: "../../../assets/Images/2.jpg", alt: "test"},
     {src: "../../../assets/Images/4.jpg", alt: "test"} 
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