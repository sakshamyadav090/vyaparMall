import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from 'src/app/vyapaar-module/utilities/api-urls';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  productDialog: boolean=false;
  selectedItem: any ;
  @Input('itemId') itemId: any;
  @Input('isProduct') isProduct: boolean;

  @Input() display: any;
  @Output() resetDisplayFlag = new EventEmitter<boolean>();
  @Output() messageEvent = new EventEmitter<String>();
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // console.log(this.itemId);
    if(this.isProduct){
      this.viewProduct(this.itemId);
    }else{
      this.viewSupplier(this.itemId);
    }
    
    // this.viewSupplier(this.itemId);
  }

  closeDialog(){
    // this.productDialog = false;
    this.resetDisplayFlag.emit(false);
    // this.messageEvent.emit("Refreshed");
    this.selectedItem = {}
  }

  approveProduct(prodId){
    let json = {
      "pid":this.itemId,
      "isApproved": 0
    }
    this.apiService.approveProd(ApiUrls.APPROVE_PRODUCT,json).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  viewProduct(productId){
    this.loading=true;
    
    this.apiService.getById(ApiUrls.GET_BY_PRODUCT_ID,productId).subscribe(res=>{
      if(res.success){
        // debugger
        // console.log(res);
        this.loading=false;
        this.selectedItem=res.data.product;
        this.productDialog = true;
      }

    },err=>{
      this.loading=false;
      console.log(err);
    })

  }

  viewSupplier(userId){
    this.loading=true;
    
    this.apiService.getById(ApiUrls.GET_BY_USER_ID,userId).subscribe(res=>{
      if(res.success){
        // debugger
        // console.log(res);
        this.loading=false;
        this.selectedItem=res.data;
        this.productDialog = true;
      }

    },err=>{
      this.loading=false;
      console.log(err);
    })

  }

  approveSupplier(){
    let json = {
      "userId":this.itemId,
      "isApproved": true
    }
    this.apiService.approve(ApiUrls.APPROVE_USER,json).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
