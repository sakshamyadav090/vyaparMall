/// <reference types="jquery" />

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/vyapaar-module/utilities/api-urls';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUser: boolean = false;
  categories: any [];
  isLoggedIn: boolean=false;

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkForUserLoggedInStatus();
    this.getCategoryList();

    
  }

  getCategoryList(){
    this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(res=>{
      this.categories=res.data;
  },err=>{
    console.log(err);
  })
  }

  registerAsSupplier() {
    this.router.navigate(['/auth/register'], { queryParams: { user: true } });
  }

  
  
  checkForUserLoggedInStatus(){
    if(localStorage.getItem('token')){
      this.apiService.getWithoutId(ApiUrls.VERIFY_TOKEN).subscribe(res=>{
        if(res.success){
          this.isLoggedIn = true;
        }
      },err=>{
        console.log(err);
      })
    }else{
      this.isLoggedIn = false;
    }
  }

}
