import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  title = 'vyapaar-head';
  registerForm : FormGroup;
  isSupplier:boolean=false;//false for user and true for supplier
  cities = [];
  mandatFlag:boolean=false;
  selectedCity:any;
  selectedCityValue:String=null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  loading:boolean=false;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      role: ['user', Validators.required],
      fName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      lName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',Validators.email],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      termAndCond:['',Validators.required]
    });
    this.selectedCityValue='';
  }

  createUser():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      fName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      lName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',Validators.email],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      termAndCond:['',Validators.required]
    })
  }

  createSupplier():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      fName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      lName:['',[Validators.required,Validators.pattern('^[A-Z.a-z]*$')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
      gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
      firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]],
      termAndCond:['',Validators.required]
    })
  }

  userOrSupplier(isSupplier:String){
    this.mandatFlag = false;
    if(isSupplier=='user'){
      this.selectedCityValue='';
      this.registerForm=this.createUser();
      this.isSupplier=false;
      this.registerForm.patchValue({
        role: 'user'
      });
    }else if(isSupplier=='supplier'){
      this.selectedCityValue=null;
      this.registerForm=this.createSupplier();
      this.isSupplier=true;
      this.registerForm.patchValue({
        role: 'supplier'
      });
    }
  }

  submit(){
    if(this.registerForm.value.password!=this.registerForm.value.confirmPassword){
      this.messageService.add({severity:'warn', summary:'Password mismatch', detail:'Password and Confirm password does not match'});
    }else{
      if(this.registerForm.valid && this.selectedCityValue!=null && this.registerForm.controls['termAndCond'].value){
        this.loading=true;
        let roleId=0;
        if(this.registerForm.controls["role"].value=='user'){
          roleId=1;
        }else if(this.registerForm.controls["role"].value=='supplier'){
          roleId=2;
        }
       let registerJson = {
        "roleId":roleId,
        "eMail": this.registerForm.controls["email"].value != undefined ? this.registerForm.controls["email"].value:null,
        "city": roleId == 2 ? this.selectedCityValue:null,
        "firmName":roleId == 2 ? this.registerForm.controls["firmName"].value:null,
        "fName": this.registerForm.controls["fName"].value,
        "lName": this.registerForm.controls["lName"].value,
        "gst":roleId == 2 ?  this.registerForm.controls["gst"].value!=null?this.registerForm.controls["gst"].value:null:null,
        "mobileNumber":this.registerForm.controls["mobileNumber"].value,
        "password": this.registerForm.controls["password"].value,
        "pincode": roleId == 2 ? this.registerForm.controls["pincode"].value:null
    };
        this.getByPost('http://localhost:8080/auth/register',registerJson).subscribe(Response=>{
          this.router.navigate(['home']);
          this.loading=false;
          },
          err => {
            this.messageService.add({severity:'error',detail:'Error while Register'});
            this.loading=false;
            // alert('nhi ho rha bhaiya');
          });
      }else if(this.selectedCityValue==null && this.registerForm.valid){
        this.messageService.add({severity:'warn', summary:'Please select city', detail:'Please check whether you have selected the city.'});
      }
      else{
        // const invalid = [];
        // const controls = this.registerForm.controls;
        // for (const name in controls) {
        //     if (controls[name].invalid) {
        //         invalid.push(name);
        //     }
        // }
        this.mandatFlag = true;
        var fieldsControls = this.registerForm.controls;
        for (let field in fieldsControls) {
          const control = this.registerForm.get(field);
          if (control.disabled == false && control.invalid) {
            control.markAsDirty({ onlySelf: true });
          }
        }
      }
  }
}

getById(url: string): Observable<any> {
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}
getByPost(url: string, body: any): Observable<any> {
  return this.http.post<any>(url, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

getCity(){
  if(this.registerForm.value.pincode!=null){
    if(this.registerForm.value.pincode.toString().length=='6'){
      this.loading=true;
      this.getById('https://api.postalpincode.in/pincode/'+this.registerForm.value.pincode).subscribe(Response=>{
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
      this.selectedCityValue=null;
    }
  }else{
    this.cities=[];
    this.selectedCityValue=null;
  }
}

selectCity(value){
  this.selectedCityValue=value;
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
