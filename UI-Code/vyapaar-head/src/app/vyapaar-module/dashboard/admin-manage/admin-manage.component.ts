import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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

  loading: boolean = false;
  addCategoryForm: FormGroup;
  unapprovedSuppliers: any;
  unapprovedProducts: any;
  cols: any[];
  listingColumn: any;
  uploadForm: FormGroup;

  productDialog: boolean=false;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  selectedProduct: any ;
  submitted: boolean;
  statuses: any[];

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];

    this.addCategoryForm = this.fb.group({
      category: ['',[Validators.required]]
    });
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

    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
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
    debugger
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
      if(response.success){
        this.unapprovedProducts = response.data;
        // console.log(response.data);
      }

    },
    err => {
      console.log(err);
    });
  }

  //neww

// editProduct(product: Product) {
//     this.product = {...product};
//     this.productDialog = true;
// }

// deleteProduct(product: Product) {
//     this.confirmationService.confirm({
//         message: 'Are you sure you want to delete ' + product.name + '?',
//         header: 'Confirm',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => {
//             this.products = this.products.filter(val => val.id !== product.id);
//             this.product = {};
//             this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
//         }
//     });
// }



//new
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

  viewProduct(userId){
    this.apiService.getById(ApiUrls.GET_BY_PRODUCT_ID,userId).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.selectedProduct=res.data;
      }

    },err=>{
      console.log(err);
    })
    this.productDialog = true;
  }

  closeDialog(){
    this.productDialog = false;
  }

  approveProduct(prodId){
    let json = {
      "pid":prodId,
      "isApproved": 0
    }
    this.apiService.approve(ApiUrls.APPROVE_PRODUCT,json).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
