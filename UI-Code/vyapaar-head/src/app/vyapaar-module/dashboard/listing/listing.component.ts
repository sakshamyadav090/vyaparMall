import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  faqData:any;
  showFaqFlag: boolean = false;
  addFaqFlag:boolean=true;
  editProductFlag:boolean=false;
  faqArray:any;


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
      manufacturer: ['',Validators.required],
      faq: this.fb.array([]),
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
    this.productDialog = true;
    this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(response=>{
        let categories = response.data;
        this.category=[];
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
  this.editProductFlag=true;

  this.loading=true;
  this.apiService.list(ApiUrls.CATEGORY_LIST).subscribe(response=>{
    let categories = response.data;
    this.category=[];
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
      this.selectedCategory=response.data.product.category;
      this.uploadForm.patchValue({
        name:response.data.product.name,
        description: response.data.product.description,
        priceStart: response.data.product.priceStart,
        priceEnd: response.data.product.priceEnd,
        quantity: response.data.product.quantity,
        origin: response.data.product.origin,
        manufacturer: response.data.product.manufacturer
      });
      this.productDialog = true;
      this.loading=false;
      //debugger
      // this.byte=this.base64ToArrayBuffer(response.data.product.image[0]);
      // var blob = new Blob([this.byte], {type: "image/*"});
      // var file = new File([blob], "name");

      // for(let i=0;i<1;i++){
      //   // this.fileUpload._files.push(blob);
      // }
      // console.log(file);
      //console.log(this.fileUpload);
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
  this.editProductFlag=false;
    this.productDialog = false;
    this.uploadForm.reset();
    for(let i=this.getFaqFormArray().value.length-1;i>-1;i--){
      this.deleteFaq(i);
  }
}

httpOptions1 = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  })
}

editSaveProduct(){
  this.formData = new FormData();
  this.loading=true;
  debugger
  if(this.uploadForm.valid){
    if(this.fileUpload._files.length==0){
      this.formData.append('file', null);
    }else{
    for(let i=0;i<this.fileUpload._files.length;i++){
      this.formData.append('file', this.fileUpload._files[i]);
    }
  }

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
    this.formData.append('data', JSON.stringify(json));

    if(this.uploadForm.value.faq.length==0){
      this.formData.append('faqData', null);
    }else{
      for(let i=0;i<this.uploadForm.value.faq.length;i++){
        this.formData.append('faqData', JSON.stringify(this.uploadForm.value.faq[i]));
      }
  }
    console.log(this.formData);
    this.apiService.saveWithHeader(ApiUrls.UPDATE_PRODUCT,this.formData).subscribe(response=>{
    // this.http.post<any>(ApiUrls.SAVE_PRODUCT,this.formData, this.httpOptions1).subscribe(response=>{
      this.loading=false;
      this.formData.delete('data');
      this.formData.delete('file');
      this.formData.delete('faqData');
      if(response.success){
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    }else{
      this.messageService.add({severity:'error', summary:'Error', detail: 'Unable to Update', life: 3000});
    }
    this.productDialog=false;
    this.getProductList();
    this.uploadForm.reset();
    for(let i=this.getFaqFormArray().value.length-1;i>-1;i--){
        this.deleteFaq(i);
    }

    },
    err => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to Update', life: 3000});
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

saveProduct() {
  debugger
  this.formData = new FormData();
  this.loading=true;
  if(this.fileUpload._files.length<4 && this.fileUpload._files.length>0 && this.uploadForm.valid){
  for(let i=0;i<this.fileUpload._files.length;i++){
    this.formData.append('file', this.fileUpload._files[i]);
  }
  if(this.uploadForm.value.faq.length==0){
    this.formData.append('faqData', null);
  }else{
    for(let i=0;i<this.uploadForm.value.faq.length;i++){
      this.formData.append('faqData', JSON.stringify(this.uploadForm.value.faq[i]));
    }
}
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
    this.messageService.add({severity:'success', summary: 'Successfull', detail: 'Product Created', life: 3000});
  }else{
    this.productDialog=false;
    this.messageService.add({severity:'error', summary:response.message, detail: response.message, life: 3000});

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

getFaqFormArray() {
  return this.uploadForm.controls['faq'] as FormArray;
}

addFaq(){
  this.addFaqFlag = false;
  //console.log(this.uploadForm.controls['faq']['controls'][0]);
  this.showFaqFlag=true;
  console.log(this.getFaqFormArray().value)
  // debugger



  if (this.getFaqFormArray().length > 0) {
    let lastRow = this.getFaqFormArray().at(this.getFaqFormArray().length - 1);
    if (lastRow.value.question == null || lastRow.value.answer == null) {

    }else{
      this.getFaqFormArray().push(
        this.fb.group({
          question: ['',Validators.required],
          answer: ['',Validators.required]
        }        ,
        {
          validator: this.faqValidation.bind(this)
        }
        ));
    }
  }else{
    this.getFaqFormArray().push(
      this.fb.group({
        question: ['',Validators.required],
        answer: ['',Validators.required]
      }        ,
      {
        validator: this.faqValidation.bind(this)
      }
      ));
  }
//   debugger
//   if(this.faqArray && this.faqArray.length>0){
//          let lastRow = this.faqArray.at(this.faqArray.length - 1);
//      if (lastRow.value.question == null || lastRow.value.answer == null) {

//      }else{
//       this.faqArray.push({
//         question:'',
//         answer:''
//       })
//      }
//   }else{

//   this.faqArray.push({
//     question:'',
//     answer:''
//   })
// }
console.log(this.getFaqFormArray().value)
}

faqValidation(group: FormGroup) {
  if(group.value.question==''){
    console.log('empty q ')
  }
  if(group.value.answer==''){
    console.log('empty a ')
  }
  console.log('group value -  '+ 'q'+ group.value.question)
  console.log('group value -  '+ 'a'+ group.value.answer)
  if ((group.value.question && group.value.question != '') && (group.value.answer && group.value.answer != '')) {
    this.addFaqFlag = true;
  } else {
    this.addFaqFlag = false;
  }
}

deleteFaq(rowIndex){
  if(rowIndex==0) this.showFaqFlag=false;
  console.log(rowIndex);
  if(rowIndex==0){this.addFaqFlag=true;}
  //console.log('eventTwo');
console.log(this.getFaqFormArray().value);
  // this.getFaqFormArray().value.forEach((control, i) => {
  //   if (control.rowIndex === rowIndex) {
  //     this.getFaqFormArray().removeAt(i);
  //   }
  // })
  console.log(this.getFaqFormArray().value.length);
  for(let i=0;i<this.getFaqFormArray().value.length;i++){
    if(i==rowIndex){
      //alert(rowIndex);
      this.getFaqFormArray().removeAt(i);
    }
  }
  console.log(this.getFaqFormArray().value);
}

trackByFunction = (index, item) => {
  debugger
  let num = null;
  if (item.value.rowIndex != null && item.value.rowIndex != '') {
    num = item.value.rowIndex;
  }
  return num;
}


}
