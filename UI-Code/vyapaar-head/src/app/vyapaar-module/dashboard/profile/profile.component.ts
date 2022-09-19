import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  loading:boolean=false;
  token:string=undefined
  networkFlag:boolean=false;
  editFlag:boolean=false;
  cities = [];
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
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',[Validators.required,Validators.email]],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
      gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
      firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]],
      aadhaar:['',[Validators.pattern('^[0-9]*$'),Validators.maxLength(12)]],
      pan:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
      natureOfBusiness:['',[Validators.pattern('^[A-Z0-9]*$')]],
      city:['',[Validators.required]]
    });
    this.profileForm.disable();
    this.loadProfileData()
  }


loadProfileData(){
  this.token=localStorage.getItem('token')
  if(!this.token){
    // this.router.navigate(['home']);
  }else{
    this.getByHeader(ApiUrls.VERIFY_TOKEN).subscribe(Response=>{
        if(Response.code!=200||!Response.success){
          // this.loading=false;
          // this.router.navigate(['home']);
          console.log(Response.code, Response.sucess)
          console.log(Response)
        }else if(Response.code==200 && Response.success){
          console.log(Response)
          this.profileForm.patchValue({
            name:Response.data.firstName +' '+ Response.data.lastName,
            aadhaar:Response.data.aadhaarNumber,
            city:Response.data.city,
            email:Response.data.email,
            firmName:Response.data.firmName,
            mobileNumber:Response.data.mobileNumber,
            pan:Response.data.panNumber,
            natureOfBusiness:Response.data.natureOfBuisness,
            pincode:Response.data.pincode,
            gst:Response.data.gst,
          });
          this.userId = Response.data.userId;
          this.cities.push(Response.data.city);
          this.loading=false;
        }
        },
        err => {
          this.networkFlag=true;
          this.loading=false;
          console.log(err)
        });
  }

}

getCity(){
  if(this.profileForm.value.pincode!=null){
    if(this.profileForm.value.pincode.toString().length=='6'){
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
}

saveProfile(){

    this.loading=true;
     let profileJson = {
      userId:this.userId,
      "email": this.profileForm.controls["email"].value != undefined ? this.profileForm.controls["email"].value:null,
      "city":  this.profileForm.controls["city"].value,
      "firmName":this.profileForm.controls["firmName"].value,
      "firstName": this.profileForm.controls["name"].value.split(' ')[0],
      "lastName": this.profileForm.controls["name"].value.split(' ')[1],
      "gst":this.profileForm.controls["gst"].value!=null?this.profileForm.controls["gst"].value:null,
      "mobileNumber":this.profileForm.controls["mobileNumber"].value,
      "pincode": this.profileForm.controls["pincode"].value,
      "aadhaarNumber": this.profileForm.controls["aadhaar"].value,
      "panNumber": this.profileForm.controls["pan"].value,
      "natureOfBuisness": this.profileForm.controls["natureOfBusiness"].value,
      "modifiedBy": this.profileForm.controls["name"].value
  };
      this.updateByPost(ApiUrls.UPDATE_USER,profileJson).subscribe(Response=>{
        this.loading=false;
        console.log(Response)
        },
        err => {
          this.messageService.add({severity:'error',detail:'Error while Updating'});
          this.loading=false;
          console.log(Response)
          alert('nhi ho rha bhaiya');
        });

  this.editFlag=false;
  this.profileForm.disable();

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
