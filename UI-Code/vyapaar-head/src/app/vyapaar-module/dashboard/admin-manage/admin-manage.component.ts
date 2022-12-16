import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';

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
  providers: [MessageService, ConfirmationService]
})
export class AdminManageComponent implements OnInit {

  // @ViewChild('dt') table: Table;
  @ViewChild('fileUpload') fileUpload: any;
  uploadForm: FormGroup;

  loading: boolean = false;
  addCategoryForm: FormGroup;
  unapprovedSuppliers: any;
  unapprovedProducts: any;
  unapprovedFeedbacks: [];
  display: string = "none";
  isProduct: boolean = false;
  isFeedback: boolean = false;
  promo: boolean = false;
  formData = new FormData();
  cols: any[];

  productDialog: boolean = false;
  selectedProduct: any;
  itemId: any;
  popupFlag: any;
  showPopup: boolean = false;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.addCategoryForm = this.fb.group({
      category: ['', [Validators.required]]
    });

    this.uploadForm = this.fb.group({
      url: ['',[Validators.required]]
    });
    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
    this.loadUapprovedFeedbacks();
  }

  httpOptions1 = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
  }

  loadUnapprovedSuppliers() {
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_SUPPLIER).subscribe(response => {
      // console.log(response.data);
      this.unapprovedSuppliers = response.data;
    },
      err => {
        console.log(err);
      });
  }

  loadUnapprovedProducts() {
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_PRODUCTS).subscribe(response => {
      // console.log(response);
      if (response.success) {
        this.unapprovedProducts = response.data;

      }
    },
      err => {
        console.log(err);
      });
  }

  loadUapprovedFeedbacks() {
    this.apiService.getWithoutId(ApiUrls.UNAPPROVED_FEEDBACKS).subscribe(response => {
      console.log(response);
      if (response.success && response.data.length!=0) {
        this.unapprovedFeedbacks = response.data;

      }
    },
      err => {
        console.log(err);
      });
  }

  addCategory() {
    this.loading = true;
    if (this.addCategoryForm.valid) {
      let json = {
        "name": this.addCategoryForm.controls["category"].value
      };
      this.apiService.getByPost(ApiUrls.ADD_CATEGORY, json).subscribe(res => {
        if (!res.success) {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Unable to Add', detail: res.data });
        } else {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Added Successfully', detail: "Category Added" });
        }
      }, err => {
        this.loading = false;
        console.log(err);
      })
    }

  }

  viewProduct(productId) {
    this.isProduct = true;
    this.isFeedback = false;
    this.showPopup = true;
    this.itemId = productId;
    this.popupFlag = true;

  }

  viewSupplier(userId) {
    this.isProduct = false;
    this.isFeedback = false;
    this.showPopup = true;
    this.itemId = userId;
    this.popupFlag = true;
    // console.log(userId)
  }

  viewFeeback(userId) {
    this.isProduct = false;
    this.isFeedback = true;
    this.showPopup = true;
    this.itemId = userId;
    this.popupFlag = true;
  }


  changePopupFlag(event) {
    this.popupFlag = event;
    this.showPopup = event;
  }

  receiveMessage(event) {
    this.messageService.add({ severity: 'success', detail: event });
    this.loadUnapprovedSuppliers();
    this.loadUnapprovedProducts();
  }

  openPromotionDialog() {
    this.promo = true;
  }

  promoteProduct() {
    this.formData = new FormData();
    this.loading = true;
    let json = {
      "url": this.uploadForm.value.url
    };

    if (this.fileUpload._files.length <= 1 && this.fileUpload._files.length > 0 && this.uploadForm.valid) {
        this.formData.append('file', this.fileUpload._files[1]);
    }

    this.formData.append('pData', JSON.stringify(json));

    this.http.post<any>(ApiUrls.ADD_PROMOTION,this.formData, this.httpOptions1).subscribe(res=>{
      console.log(res);
    }, err=>{
      console.log(err);
    });

  }

}
