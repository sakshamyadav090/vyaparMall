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
  selectedProduct: any ;
  @Input('prodId') prodId: any;

  @Input() display: any;
  @Output() resetDisplayFlag = new EventEmitter<boolean>();
  @Output() messageEvent = new EventEmitter<String>();
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.prodId);
    this.viewProduct(this.prodId);
  }

  closeDialog(){
    // this.productDialog = false;
    this.resetDisplayFlag.emit(false);
    // this.messageEvent.emit("Error While updating");
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

  viewProduct(productId){
    this.loading=true;
    debugger
    this.apiService.getById(ApiUrls.GET_BY_PRODUCT_ID,productId).subscribe(res=>{
      if(res.success){
        console.log(res);
        this.loading=false;
        this.selectedProduct=res.data;
        this.productDialog = true;
      }

    },err=>{
      this.loading=false;
      console.log(err);
    })

  }


}
