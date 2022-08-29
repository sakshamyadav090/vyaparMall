import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  display: boolean=false

  constructor() { }

  ngOnInit(): void {
  }

  sidebar(){
    !this.display?this.display=true:this.display=false
  }



}
