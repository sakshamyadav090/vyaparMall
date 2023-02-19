import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products:any[]
  constructor() { }

  ngOnInit(): void {
    this.products = [    { name: 'Product 1', description: 'This is product 1', price: 100, image: 'https://picsum.photos/200/300' },    { name: 'Product 2', description: 'This is product 2', price: 200, image: 'https://picsum.photos/200/300' },    { name: 'Product 3', description: 'This is product 3', price: 300, image: 'https://picsum.photos/200/300' },    { name: 'Product 4', description: 'This is product 4', price: 400, image: 'https://picsum.photos/200/300' }];
 
  }

}
