import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  images: any[]
  constructor() { }

  ngOnInit(): void {

    this.images = [
     {src: "../../../assets/Images/slide1.jpg",
     alt: "test"},
     {
      src: "../../../assets/Images/slide3.jpg",
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
