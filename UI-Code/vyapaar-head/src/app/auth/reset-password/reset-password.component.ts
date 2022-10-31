import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from 'src/app/vyapaar-module/utilities/api-urls';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {
  
  resetForm: FormGroup;
  otpForm: FormGroup;
  enableOTP: boolean = false;
  phoneNumber: string = null
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private apiService: ApiService,
    private apiUrls:ApiUrls,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      phoneNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required,Validators.pattern('^[0-9]{6}$')]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  resetPassword(){
    this.loading=true;
    if(this.resetForm.valid){
      let json={
        "phoneNumber":this.resetForm.controls["phoneNumber"].value
      };
      
      //TODO: check for user exists with provided phone number first

      this.apiService.getByPost(ApiUrls.SEND_OTP,json).subscribe(res=>{
        if(res.success){
          this.phoneNumber=this.resetForm.controls["phoneNumber"].value;
          this.enableOTP=true
          this.loading=false;
        }else{
          this.loading=false;
          this.messageService.add({severity:'error', summary:'Network Error!', detail:'OTP not sent try again.'});
        }
      }, err=>{
        this.loading=false;
        this.messageService.add({severity:'error', summary:"OTP not sent!" , detail:err});
      })
      
    }else{
      this.loading=false;
      this.messageService.add({severity:'error', summary:'Invaild Phone Number', detail:'Please check the number entered.'});
    }
  }

  editPhoneNo(){
    this.enableOTP=false;
  }

  verifyPassword(){
    this.loading=true;
    let json={
      "phoneNumber":this.phoneNumber,
      "oneTimePassword": this.otpForm.controls["otp"].value
    };
    this.apiService.getByPost(ApiUrls.VALIDATE_OTP,json).subscribe(res=>{
      if(res.success){
        // this.loading=false;
        if(this.otpForm.controls["password"].value == this.otpForm.controls["confirmPassword"].value){
          this.changePassword();
        }else{
          this.loading=false;
          this.messageService.add({severity:'warn', summary:'Mismatch Password', detail:'Check for both passwords are same.'});
        }
      }else{
        this.loading=false;
        this.messageService.add({severity:'error', summary:"Invaild OTP" , detail:res.data});
      }
    }, err=>{
      this.loading=false;
      this.messageService.add({severity:'error', summary:"Invaild OTP" , detail:err});
    })

  }

  changePassword(){
   
    this.messageService.add({severity:'success', summary:"Password Changed Successfully" , detail:""});
    // setInterval(()=>{
    //   this.loading=false;
    //   this.router.navigate(['auth']);
    // },2000)
    
      //TODO:change password

  }

}
