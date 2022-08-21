import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'vyapaar-head';
  loginForm : FormGroup;
  typeOfAccount:boolean=false;//false for user and true for supplier
  cities = [];
  signInOrSignUp:boolean=true;
  
  selectedCity:any;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  constructor(private fb: FormBuilder,private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      role: ['user', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[''],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
    // this.loginForm = this.fb.group({
    //   role: ['', Validators.required],
    //   city: ['', [Validators.required,Validators.pattern('^[A-Z a-z]*$'),Validators.maxLength(10)]],
    //   pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
    //   contactPersonName: ['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(35)]],
    //   mobileNumber: ['',[Validators.required,Validators.pattern('^[0-9]\d{10}$')]],
    //   email: ['', [Validators.email]],
    //   password: ['',Validators.required],
    //   gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
    //   //panCard:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(10)]],
    //   //aadharCard:['',[Validators.pattern('^[0-9]*$'),Validators.maxLength(12),Validators.minLength(12)]],
    //   firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]]
    //   //natureOfBussiness:['',[Validators.required]]
    // });
  }

  createUser():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[''],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }

  createSupplier():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[null,Validators.required],
      password:[null,Validators.required],
      confirmPassword:['',Validators.required],
      city: ['', [Validators.required,Validators.pattern('^[A-Z a-z]*$'),Validators.maxLength(10)]],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
    //contactPersonName: ['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(35)]],
      gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
      firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]]
    })
  }

  userOrSupplier(typeOfAccount:String){
    // debugger
    if(typeOfAccount=='user'){
      this.loginForm=this.createUser();
      this.typeOfAccount=false;
      this.loginForm.patchValue({
        role: 'user'
      });
    }else if(typeOfAccount=='supplier'){
      this.loginForm=this.createSupplier();
      this.typeOfAccount=true;
      this.loginForm.patchValue({
        role: 'supplier'
      });
    }
  }

  submit(){
    if(this.loginForm.value.password!=this.loginForm.value.confirmPassword){
      alert("Password to same likh de");
    }else{
    console.log(this.loginForm.value);
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(invalid);
  }
}

getById(url: string): Observable<any> {
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

getCity(){ //{PINCODE}  http://postalpincode.in/api/pincode/
  if(this.loginForm.value.pincode!=null){
    if(this.loginForm.value.pincode.toString().length=='6'){
      this.getById('https://api.postalpincode.in/pincode/'+this.loginForm.value.pincode).subscribe(Response=>{
        this.cities=[];
        for(let i=0;i<Response[0].PostOffice.length;i++){
          this.cities.push(Response[0].PostOffice[i].Name);
          console.log(Response[0].PostOffice[i].Name);
        }
        });
    }
  }
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
