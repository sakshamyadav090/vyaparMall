import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-master-manage',
  templateUrl: './master-manage.component.html',
  styleUrls: ['./master-manage.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class MasterManageComponent implements OnInit {

  searchValue:String='';
  loading:boolean=false;
  listData:any;
  adminColumn: any[];
  AdminAccountForm: FormGroup;
  AdminAccountDialog:boolean=false;
  mandatFlag:boolean=false;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAdminList();
  }
 // this.searchValue = '';
  filterGlobal(table){
    table.filterGlobal(this.searchValue, 'contains');
  }

  getAdminList(){
    this.loading=true;
    this.apiService.list(ApiUrls.ADMIN_LIST).subscribe(response=>{
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

    this.adminColumn = [
      { field: 'name', header: 'Name',sortField:'name' },
      { field: 'email', header: 'Email'},
      { field: 'createdDate', header: 'Date Created',sortField:'createdDate'},
      { field: '', header: 'Action(s)',sortField:'', width: "8%", class: "text-center tableaction"}
    ];
  }

  delete(id,name) {
    debugger
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading=true;
          this.apiService.deleteByPut(ApiUrls.DELETE_ADMIN+id).subscribe(response=>{
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Admin Deleted', life: 3000});
            this.loading=false;
            this.getAdminList();
          },
          err => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to delete', life: 3000});
            this.loading=false;
            console.log(err)
          });

        }
    });
}

openDialog(){
  this.AdminAccountDialog=true;
  this.AdminAccountForm = this.fb.group({
    fName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
    lName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
    mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
    email:['',Validators.email],
    password:['',Validators.required]
  });
}
hideDialog(){
  this.AdminAccountDialog=false;
  this.mandatFlag = false;
  this.AdminAccountForm.reset();
}

createNewAdminAccount(){
if(this.AdminAccountForm.valid){

  let registerJson = {
    "firstName": this.AdminAccountForm.controls["fName"].value,
    "lastName": this.AdminAccountForm.controls["lName"].value,
    "email": this.AdminAccountForm.controls["email"].value != undefined ? this.AdminAccountForm.controls["email"].value:null,
    "password": this.AdminAccountForm.controls["password"].value,
    "mobileNumber":this.AdminAccountForm.controls["mobileNumber"].value
};
    this.apiService.saveWithToken(ApiUrls.REGISTER_ADMIN,registerJson).subscribe(Response=>{
      this.messageService.add({severity:'success',detail:'Admin account created successfully'});
      this.AdminAccountDialog=false;
      this.mandatFlag = false;
      this.AdminAccountForm.reset();
      this.getAdminList();
      this.loading=false;

      },
      err => {
        this.messageService.add({severity:'error',detail:'Error while Register'});
        this.loading=false;
        console.log(err);
      });

}
else{
  this.mandatFlag = true;
  var fieldsControls = this.AdminAccountForm.controls;
  for (let field in fieldsControls) {
    const control = this.AdminAccountForm.get(field);
    if (control.disabled == false && control.invalid) {
      control.markAsDirty({ onlySelf: true });
    }
  }
}
}
}
