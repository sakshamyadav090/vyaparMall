import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';
import { Product } from './product';
import { ProductService } from './productservice';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService, ConfirmationService,ProductService]
})
export class AdminManageComponent implements OnInit {

  // @ViewChild('dt') table: Table;
  loading: boolean = false;
  addCategoryForm: FormGroup;
  unapprovedSuppliers: any;
  unapprovedProducts: any;
  unapprovedFeedbacks: any;
  display: string="none";
  isProduct: boolean = false;
  isFeedback: boolean = false;
  promo: boolean = false;

  cols: any[];

  productDialog: boolean=false;
  selectedProduct: any ;
  itemId: any;
  popupFlag: any;
  showPopup: boolean = false;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.addCategoryForm = this.fb.group({
      category: ['',[Validators.required]]
    });
    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
    this.loadUapprovedFeedbacks();
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout
    setTimeout(() => {
        //load data of required page
        // let loadedCars = this.cars.slice(event.first, (event.first + event.rows));

        // //populate page of virtual cars
        // Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);

        //trigger change detection
        event.forceUpdate();
    }, Math.random() * 1000 + 250);
  }

  loadUnapprovedSuppliers(){
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_SUPPLIER).subscribe(response=>{
      // console.log(response.data);
      this.unapprovedSuppliers = response.data;
    },
    err => {
      console.log(err);
    });
  }

  loadUnapprovedProducts(){
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_PRODUCTS).subscribe(response=>{
      // console.log(response);
      if(response.success){
        this.unapprovedProducts = response.data;

      }
    },
    err => {
      console.log(err);
    });
  }

  loadUapprovedFeedbacks(){
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_FEEDBACKS).subscribe(response=>{
      // console.log(response);
      if(response.success){
        this.unapprovedFeedbacks = response.data;

      }
    },
    err => {
      console.log(err);
    });
  }

  addCategory() {
    this.loading=true;
    if(this.addCategoryForm.valid){
      let json={
        "name": this.addCategoryForm.controls["category"].value
      };
      this.apiService.getByPost(ApiUrls.ADD_CATEGORY, json).subscribe(res=>{
        if(!res.success){
          this.loading=false;
          this.messageService.add({severity:'error', summary:'Unable to Add', detail:res.data});
        }else{
          this.loading=false;
          this.messageService.add({severity:'success', summary:'Added Successfully', detail: "Category Added"});
        }
      }, err=>{
        this.loading=false;
        console.log(err);
      })
    }

  }

  viewProduct(productId){
    this.isProduct = true;
    this.isFeedback = false;
    this.showPopup= true;
    this.itemId = productId;
    this.popupFlag = true;
    
  }

  viewSupplier(userId){
    this.isProduct = false;
    this.isFeedback = false;
    this.showPopup= true;
    this.itemId = userId;
    this.popupFlag = true;
    // console.log(userId)
  }

  viewFeeback(userId){
    this.isProduct = false;
    this.isFeedback = true;
    this.showPopup= true;
    this.itemId = userId;
    this.popupFlag = true;
    // console.log(userId)
  }


  changePopupFlag(event) {
    this.popupFlag = event;
    this.showPopup = event;
  }

  receiveMessage(event) {
    this.messageService.add({ severity: 'success', detail: event });
    // this.getData();
    // this.searchValue = '';
    // this.table.reset();
    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
  }

  openPromotionDialog(){
    this.promo = true;
  }

}
