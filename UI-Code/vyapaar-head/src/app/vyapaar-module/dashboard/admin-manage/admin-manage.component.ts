import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';
import { Car } from './car';
import { CarService } from './carservice';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css'],
  providers: [CarService]
})
export class AdminManageComponent implements OnInit {

  cars: Car[];
  unapprovedSuppliers = [];
  virtualCars: Car[];
  unapprovedProducts = [];
  cols: any[];
  listingColumn: any;

  constructor(private carService: CarService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'firmName', header: 'Firm Name' },
      { field: 'email', header: 'Email' },
      { field: 'city', header: 'City' },
      { field: 'createdDate', header: 'Created On' }
    ];

    this.listingColumn = [
      { field: 'pname', header: 'Prodoct Name' },
      { field: 'ppriceRange', header: 'Price Range'},
      { field: 'category', header: 'Category' },
      { field: 'quantity' , header: 'Quantity'}
    ];

    // this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
    // this.virtualCars = Array.from({ length: 10000 });
    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
    // this.cars=this.unapprovedSuppliers;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout
    setTimeout(() => {
        //load data of required page
        let loadedCars = this.cars.slice(event.first, (event.first + event.rows));

        //populate page of virtual cars
        Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);

        //trigger change detection
        event.forceUpdate();
    }, Math.random() * 1000 + 250);
  }

  loadUnapprovedSuppliers(){
    debugger
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_SUPPLIER).subscribe(response=>{
      console.log(response.data);
      // this.unapprovedSuppliers = response.data;
    },
    err => {
      console.log(err);
    });
  }

  loadUnapprovedProducts(){
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_PRODUCTS).subscribe(response=>{
      console.log(response.data);
      // this.unapprovedProducts = response.data;
    },
    err => {
      console.log(err);
    });
  }


}
