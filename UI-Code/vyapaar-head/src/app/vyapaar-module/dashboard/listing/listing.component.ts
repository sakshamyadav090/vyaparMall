import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [MessageService,ConfirmationService,ProductService]
})
export class ListingComponent implements OnInit {

  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  category: any[];
  listingColumn: any[];
  listData:any;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    //this.productService.getProducts().then(data => this.products = data);
    this.getProductList();

    this.category = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }

  getProductList(){
    this.apiService.getWithoutId(ApiUrls.PRODUCT_LIST_BY_SUPPLIER).subscribe(response=>{
      if(response.data.length>0){
        this.listData=response.data;
      }
      console.log(this.listData);
    })

    this.listingColumn = [
      { field: 'pname', header: 'Name' },
      // { field: '', header: 'Image' },
      { field: 'pPriceRange', header: 'Price Range'},
      { field: 'pCategory', header: 'Category' },
      { field: 4 , header: 'Reviews' },
      { field: 'quantity', header: 'Status' },
      { field: '', header: 'Action(s)', width: "8%", class: "text-center tableaction"}
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
                label: "OTHER",
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
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
}

deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
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
}
