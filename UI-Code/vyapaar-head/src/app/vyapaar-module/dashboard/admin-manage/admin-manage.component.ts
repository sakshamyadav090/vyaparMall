import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

  virtualCars: Car[];

  cols: any[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Name' },
      { field: 'vin', header: 'Firm Name' },
      { field: 'year', header: 'Email' },
      { field: 'brand', header: 'City' },
      { field: 'color', header: 'Created On' },
      { field: 'color', header: 'Actions' }
    ];

    this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
    this.virtualCars = Array.from({ length: 10000 });
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

}
