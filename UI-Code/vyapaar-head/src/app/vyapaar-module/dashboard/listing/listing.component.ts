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
  listingColumn: any[];
  listData:any;
  uploadedFiles:File[];
  file:File;
  uploadForm: FormGroup;
  formData=new FormData();
  loading:boolean=false;


  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    //this.productService.getProducts().then(data => this.products = data);
    this.getProductList();

    this.category = [];

    this.uploadForm = this.fb.group({
      file: ['',Validators.required]
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

    this.productDialog = true;
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
}

httpOptions1 = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  })
}

saveProduct() {
  this.loading=true;
  if(this.fileUpload._files.length<4){
  for(let i=0;i<this.fileUpload._files.length;i++){
    this.formData.append('file', this.fileUpload._files[i]);
  }
  this.submitted = true;
  let json={
    "pname":this.product.name,
    "pdescription":this.product.description,
    "ppriceStartRange":this.product.priceStart,
    "ppriceEndRange":this.product.priceEnd,
    "quantity":this.product.quantity,
    "category":{"categoryId":this.product.category},
    "porigin":this.product.origin,
    "pmanufacturer":this.product.manufacturer
    // "file":this.formData
  }
  this.formData.append('data', JSON.stringify(json));
  this.http.post<any>(ApiUrls.SAVE_PRODUCT,this.formData, this.httpOptions1).subscribe(response=>{
    this.loading=false;
    this.formData.delete('data');
    this.formData.delete('file');
    if(response.success){
    this.productDialog=false;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
  }
  this.getProductList();
  },
  err => {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch', life: 3000});
    this.loading=false;
    console.log(err)
  });
}
    // if (this.product.name.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //     }
    //     else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
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

test(event){

// console.log(this.fileUpload._files.length);
// for(let j=0;j<this.fileUpload._files.length;j++)
// this.fileUpload.remove(event,j);

}

search(event,table){
  table.filterGlobal(event.value, 'contains')
}




}
