import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [MessageService,ConfirmationService,ProductService]
})
export class ListingComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: any;
  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  category: any[];
  selectedCategory:any;
  listingColumn: any[];
  listData:any;
  uploadedFiles:File[];
  file:File;
  uploadForm: FormGroup;
  formData=new FormData();
  loading:boolean=false;
  mandatFlag:boolean=false;
  byte:any;


  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductList();

    this.category = [];

    this.uploadForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      priceStart: ['',Validators.required],
      priceEnd: ['',Validators.required],
      quantity: ['',Validators.required],
      category: ['',Validators.required],
      origin: ['',Validators.required],
      manufacturer: ['',Validators.required]
    });
  }

  getProductList(){
    this.loading=true;
    this.apiService.getWithoutId(ApiUrls.PRODUCT_LIST_BY_SUPPLIER).subscribe(response=>{
      if(response.data.length>0){
        this.listData=response.data;
      }
      this.loading=false;
    },
    err => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch', life: 3000});
      this.loading=false;
      console.log(err)
    });

    this.listingColumn = [
      { field: 'pname', header: 'Name',sortField:'pname' },
      { field: '', header: 'Image',sortField:'' },
      { field: 'ppriceRange', header: 'Price Range',sortField:''},
      { field: 'category', header: 'Category',sortField:'category' },
      { field: 'quantity' , header: 'Quantity',sortField:'quantity' },
      { field: 'status', header: 'Status',sortField:'' },
      { field: '', header: 'Action(s)',sortField:'', width: "8%", class: "text-center tableaction"}
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(response=>{
        let categories = response.data;
        this.category=[
            {
                label: "Other",
                value: 0
            }
        ]
        let categoryList:Array<String> = [];
      categories.forEach(element => {
        if(categoryList.indexOf(element.categoryId)==-1){
            categoryList.push(element.categoryId);
        this.category.push({
          label : element.name,
          value : element.categoryId
        })
      }
    })
    })
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

editProduct(event) {

  this.loading=true;
  this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(response=>{
    let categories = response.data;
    this.category=[
        {
            label: "Other",
            value: 0
        }
    ]
    let categoryList:Array<String> = [];
  categories.forEach(element => {
    if(categoryList.indexOf(element.categoryId)==-1){
        categoryList.push(element.categoryId);
    this.category.push({
      label : element.name,
      value : element.categoryId
    })
  }
})
})
  this.apiService.getById(ApiUrls.GET_BY_PRODUCT_ID,event).subscribe(response=>{
    if(response.success){
      this.selectedCategory=response.data.category;
      this.uploadForm.patchValue({
        name:response.data.name,
        description: response.data.description,
        priceStart: response.data.priceStart,
        priceEnd: response.data.priceEnd,
        quantity: response.data.quantity,
        origin: response.data.origin,
        manufacturer: response.data.manufacturer
      });
      this.productDialog = true;
      this.loading=false;
      console.log(blob);
      this.byte=this.base64ToArrayBuffer(response.data.image[0]);
      var blob = new Blob([this.byte], {type: "image/*"});
      var file = new File([blob], "name");

      for(let i=0;i<1;i++){
        // this.fileUpload._files.push(blob);
      }
      console.log(file);
      console.log(this.fileUpload);
  }
  },
  err => {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch!', life: 3000});
    this.loading=false;
    console.log(err)
  });
}

deleteProduct(id,name) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading=true;
          this.apiService.delete(ApiUrls.DELETE_PRODUCT,id).subscribe(response=>{
            if(response.success){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            this.loading=false;
            this.getProductList();
          }
          },
          err => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to delete', life: 3000});
            this.loading=false;
            console.log(err)
          });

        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.uploadForm.reset();
}

httpOptions1 = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  })
}

saveProduct() {
  this.loading=true;
  if(this.fileUpload._files.length<4 && this.fileUpload._files.length>0 && this.uploadForm.valid){
  for(let i=0;i<this.fileUpload._files.length;i++){
    this.formData.append('file', this.fileUpload._files[i]);
  }
  this.submitted = true;
  let json={
    "pname":this.uploadForm.value.name,
    "pdescription":this.uploadForm.value.description,
    "ppriceStartRange":this.uploadForm.value.priceStart,
    "ppriceEndRange":this.uploadForm.value.priceEnd,
    "quantity":this.uploadForm.value.quantity,
    "category":{"categoryId":this.uploadForm.value.category},
    "porigin":this.uploadForm.value.origin,
    "pmanufacturer":this.uploadForm.value.manufacturer
  }
  this.formData.append('pData', JSON.stringify(json));
  this.http.post<any>(ApiUrls.SAVE_PRODUCT,this.formData, this.httpOptions1).subscribe(response=>{
    this.loading=false;
    this.formData.delete('pData');
    this.formData.delete('file');
    if(response.success){
    this.productDialog=false;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
  }
  this.getProductList();
  this.uploadForm.reset();
  },
  err => {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch', life: 3000});
    this.loading=false;
    console.log(err)
  });
}    else {
  this.mandatFlag = true;
  var fieldsControls = this.uploadForm.controls;
  for (let field in fieldsControls) {
    const control = this.uploadForm.get(field);
    if (control.disabled == false && control.invalid) {
      control.markAsDirty({ onlySelf: true });
    }
  }
}
}



findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

search(event,table){
  table.filterGlobal(event.value, 'contains')
}

base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}


}
