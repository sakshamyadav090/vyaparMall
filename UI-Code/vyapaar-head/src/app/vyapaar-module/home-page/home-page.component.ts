import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../utilities/api-urls';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  images: any[]
  products: any[]
  categories: any;
  prodMap = new Map<any, any>();
  constructor( private apiService: ApiService) { }


  ngOnInit(): void {
    this.images = [
      {src: "../../../assets/Images/1.jpg", alt: "test"},
      {src: "../../../assets/Images/3.jpg", alt: "test"},
      {src: "../../../assets/Images/2.jpg", alt: "test"},
      {src: "../../../assets/Images/4.jpg", alt: "test"} 
     ]
    this.loadApprovedProducts();
    this.products = [    
      { name: 'Product 1', description: 'This is product 1', 
      price: 100, image: 'https://picsum.photos/200/300' },    
      { name: 'Product 2', description: 'This is product 2', 
      price: 200, image: 'https://picsum.photos/200/300' },    
      { name: 'Product 3', description: 'This is product 3', 
      price: 300, image: 'https://picsum.photos/200/300' },    
      { name: 'Product 4', description: 'This is product 4', 
      price: 400, image: 'https://picsum.photos/200/300' },    
      { name: 'Product 5', description: 'This is product 5', 
      price: 500, image: 'https://picsum.photos/200/300' }  
    ];
  }

  currentSlide = 0;

  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.images.length - 1;
    } else {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }

  loadApprovedProducts(){

    this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(res=>{
        this.categories=res.data;

        this.categories.slice(0,5).map(category=>{
          this.apiService.approvedProductListByCategory(ApiUrls.APPROVED_PRODUCT_LIST, category).subscribe(res=>{
            this.prodMap.set(category.name,res.data);
          }, err=>{
            console.log(err)
          })
        })

    },err=>{
      console.log(err);
    });


    
    
  }


}