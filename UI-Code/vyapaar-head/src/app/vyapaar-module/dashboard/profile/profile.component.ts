import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../../utilities/api-urls';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[MessageService]
})
export class ProfileComponent implements OnInit {

  selectedCity:String='';
  userId:Number=-1
  mandatFlag:boolean=false;
  profileForm:FormGroup;
  otpForm : FormGroup;
  loading:boolean=false;
  token:string=undefined
  networkFlag:boolean=false;
  editFlag:boolean=false;
  cities = [];
  business: any[];
  selectedBusiness:any;
  httpResponse:any;
  isPhoneNoValidated:boolean=false;
  sendOTP:string='Validate Mobile Number';
  OTP:boolean=false;
  sentOTP:Boolean=false;
  showValidateOtpButton:boolean=false;
  seconds:number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    })
  }

  constructor(
    private http: HttpClient,
    private router:Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private apiService:ApiService
    ) { }

  ngOnInit(): void {
    this.loading=true;
    this.profileForm = this.fb.group({
      name:['',[Validators.required,Validators.pattern('^[A-Z. a-z]*$')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',[Validators.required,Validators.email]],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]{6}$')]],
      gst:['',[Validators.required,Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'),Validators.maxLength(15)]],
      firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]],
      aadhaar:['',[Validators.required,Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]],
      pan:['',[Validators.required,Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      natureOfBusiness:['',[Validators.required]],
      city:['',[Validators.required]]
    });
    this.profileForm.disable();
    this.loadProfileData();
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required,Validators.pattern('^[0-9]{6}$')]]
    });
  }


loadProfileData(){
  this.token=localStorage.getItem('token')
  if(!this.token){
    // this.router.navigate(['home']);
  }else{
    this.getByHeader(ApiUrls.VERIFY_TOKEN).subscribe(Response=>{
        if(Response.code!=200||!Response.success){
          this.loading=false;
          // this.router.navigate(['home']);
          console.log(Response)
        }else if(Response.code==200 && Response.success){
          this.loading=false;
          this.httpResponse=Response.data;
          this.selectedBusiness=Response.data.natureOfBuisness;
          this.profileForm.patchValue({
            name:Response.data.firstName +' '+ Response.data.lastName,
            aadhaar:Response.data.aadhaarNumber,
            city:Response.data.city,
            email:Response.data.email,
            firmName:Response.data.firmName,
            mobileNumber:Response.data.mobileNumber,
            pan:Response.data.panNumber,
            pincode:Response.data.pincode,
            gst:Response.data.gst,
            natureOfBuisness:Response.data.natureOfBuisness
          });
          this.userId = Response.data.userId;
          this.cities.push(Response.data.city);
          this.loading=false;
        }
        },
        err => {
          this.networkFlag=true;
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch', life: 3000});
          console.log(err)
        });
  }

}

getCity(){
  if(this.profileForm.value.pincode!=null){
    if(this.profileForm.controls['pincode'].valid){
      this.loading=true;
      this.getById('https://api.postalpincode.in/pincode/'+this.profileForm.value.pincode).subscribe(Response=>{
        this.cities=[];
        for(let i=0;i<Response[0].PostOffice.length;i++){
          this.cities.push(Response[0].PostOffice[i].Name);
          console.log(Response[0].PostOffice[i].Name);
          this.loading=false;
        }
        },
        err => {
          this.loading=false;
          this.messageService.add({severity:'error',detail:'Error while fetching city'});
        });
    }else{
      this.cities=[];
    }
  }else{
    this.cities=[];
  }
}

enableEdit(){
  this.editFlag=true;
  this.profileForm.enable();
  this.getCity();
  this.getBusinesTypes();
}

saveProfile(){
  this.mandatFlag = false;
  if(this.profileForm.valid && this.isPhoneNoValidated){
    if(
      this.profileForm.controls["email"].value!=this.httpResponse.email ||
      this.profileForm.controls["pincode"].value!=this.httpResponse.pincode ||
      this.profileForm.controls["firmName"].value!=this.httpResponse.firmName ||
      this.profileForm.controls["gst"].value!=this.httpResponse.gst ||
      this.profileForm.controls["aadhaar"].value!=this.httpResponse.aadhaar ||
      this.profileForm.controls["pan"].value!=this.httpResponse.pan ||
      this.profileForm.controls["natureOfBuisness"].value!=this.httpResponse.natureOfBuisness ||
      this.profileForm.controls["firstName"].value!=this.httpResponse.firstName ||
      this.profileForm.controls["lastName"].value!=this.httpResponse.lastName){
    this.loading=true;
    let profileJson = {
     userId:this.userId,
     "email": this.profileForm.controls["email"].value != undefined || '' ? this.profileForm.controls["email"].value:null,
     "city":  this.profileForm.controls["city"].value,
     "firmName":this.profileForm.controls["firmName"].value,
     "firstName": this.profileForm.controls["name"].value.split(' ')[0],
     "lastName": this.profileForm.controls["name"].value.split(' ')[1],
     "gst":this.profileForm.controls["gst"].value!=null?this.profileForm.controls["gst"].value:null,
     "mobileNumber":this.profileForm.controls["mobileNumber"].value,
     "pincode": this.profileForm.controls["pincode"].value,
     "aadhaarNumber": this.profileForm.controls["aadhaar"].value,
     "panNumber": this.profileForm.controls["pan"].value,
     "natureOfBuisness": {"businessId":this.profileForm.controls["natureOfBusiness"].value}
 };
     this.updateByPost(ApiUrls.UPDATE_USER,profileJson).subscribe(Response=>{
       console.log(Response);
       this.loading=false;
       this.editFlag=false;
       this.profileForm.disable();
       },
       err => {
         this.messageService.add({severity:'error',detail:'Error while Updating'});
         this.loading=false;
         console.log(Response)
       });
      }
  }else{
    this.mandatFlag = true;
    var fieldsControls = this.profileForm.controls;
    for (let field in fieldsControls) {
      const control = this.profileForm.get(field);
      if (control.disabled == false && control.invalid) {
        control.markAsDirty({ onlySelf: true });
      }
    }
  }
}


getByPost(url: string, body: any): Observable<any> {
  return this.http.post<any>(url, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

updateByPost(url: string, body: any): Observable<any> {
  return this.http.put<any>(url, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

getById(url: string): Observable<any> {
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

getByHeader(url: string): Observable<any> {
  return this.http.get<any>(url, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

cancel(){
  this.editFlag=false;
  this.profileForm.disable();
  this.profileForm.reset();
  this.mandatFlag = false;
}

getBusinesTypes(){
  this.apiService.list(ApiUrls.BUSINESS_LIST).subscribe(response=>{
    let businessTemp = response.data;
    this.business=[];
    let businessList:Array<String> = [];
  businessTemp.forEach(element => {
    if(businessList.indexOf(element.businessId)==-1){
        businessList.push(element.businessId);
    this.business.push({
      label : element.name,
      value : element.businessId
    })
  }
})
})
}

validatePhoneNo(){
  this.seconds=30;
  // this.loading=true;
  let json={
    "phoneNumber":this.profileForm.value.mobileNumber.toString()
  };
// remove 255 to 260 when you implemented the API and uncomment line 262 to 275 and 250
  this.OTP=true;
  this.sentOTP=true;
  this.sendOTP='Resend OTP';
  setTimeout(() => {
    this.OTP=false;
  }, 30000);
//
  // this.apiService.getByPost('this.apiUrls.SEND_OTP',json).subscribe(res=>{
  //   if(res.success){
  //     this.OTP=true;
  //     this.sentOTP=true;
  //     this.sendOTP='Resend OTP';
  //     setTimeout(() => {
  //       this.OTP=false;
  //     }, 30000);
  //     this.loading=false;
  //   }
  // },err=>{
  //   this.loading=false;
  //   console.log(err);
  // });

  const myInterval = setInterval(() => {
    this.seconds--;
    if(this.seconds==0){
      clearInterval(myInterval);
    }
  }, 1000);

}

submitOTP(){
  let json={
    "oneTimePassword": this.otpForm.value.otp.toString()
  };
// remove 290 to 292 when you implemented the API and uncomment line 293 to 300
  this.isPhoneNoValidated=true;
//
  // this.apiService.getByPost('this.apiUrls.VALIDATE_OTP',json).subscribe(res=>{
  //   if(res.success){
  //     this.isPhoneNoValidated=true;
  //   }
  // },err=>{
  //   this.loading=false;
  //   console.log(err);
  // });
}


private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

}
