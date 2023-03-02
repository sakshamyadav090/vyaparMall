import { Component, HostListener, OnInit } from '@angular/core';
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
    this.loadBanners();
    // this.images = [
    //   {src: "../../../assets/Images/1.jpg", alt: "test"},
    //   {src: "../../../assets/Images/3.jpg", alt: "test"},
    //   {src: "../../../assets/Images/2.jpg", alt: "test"},
    //   {src: "../../../assets/Images/4.jpg", alt: "test"} 
    //  ]
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

  numProductsToShow = 6;
  numCategoryToShow = 9;
  cardWidth = '15%';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowWidth = event.target.innerWidth;
    if (windowWidth < 768) {
      this.numProductsToShow = 3;
      this.numCategoryToShow = 4;
      this.cardWidth = '33%';
    } else if (windowWidth < 992) {
      this.numProductsToShow = 4;
      this.numCategoryToShow = 5;
      this.cardWidth = '24%';
    } else if (windowWidth < 1200) {
      this.numProductsToShow = 5;
      this.numCategoryToShow = 7;
      this.cardWidth = '19%';
    } else {
      this.numProductsToShow = 6;
      this.numCategoryToShow = 9;
      this.cardWidth = '15%';
    }
  }

  loadBanners(){
    this.apiService.list(ApiUrls.BANNER_LIST).subscribe(res=>{
      this.images = res.data
    },err=>{
      console.log(err);
    })
  }

  onBannerClick(image) {
    console.log(image.url)
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