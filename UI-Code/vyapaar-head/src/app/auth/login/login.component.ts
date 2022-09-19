import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/vyapaar-module/utilities/api-urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'vyapaar-head';
  loginForm:FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  loading:boolean=false;
  networkFlag:boolean=false;
  credentialFlag:boolean=false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router:Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password:['',Validators.required]
    });
  }


  submit(){
    if(this.loginForm.valid){
      this.loading=true;
      let loginJson = {
        "userName": this.loginForm.controls["userName"].value,
        "password": this.loginForm.controls["password"].value
      };
      this.getByPost(ApiUrls.LOGIN,loginJson).subscribe(Response=>{
        if(Response.access_token==null){
          this.credentialFlag=true;
          this.loading=false;
          console.log(Response)
        }else if(Response.access_token!=null){
          localStorage.setItem('token',Response.access_token);
          this.loading=false;
          this.router.navigate(['home']);
          console.log(Response)
        }
        },
        err => {
          this.networkFlag=true;
          this.loading=false;
          console.log(err)
        });
    }else{
      // const invalid = [];
      // const controls = this.loginForm.controls;
      // for (const name in controls) {
      //     if (controls[name].invalid) {
      //         invalid.push(name);
      //     }
      // }
      var fieldsControls = this.loginForm.controls;
      for (let field in fieldsControls) {
        const control = this.loginForm.get(field);
        if (control.disabled == false && control.invalid) {
          control.markAsDirty({ onlySelf: true });
        }
      }
  }
}

hideMessage() {
  setTimeout(() => { this.networkFlag = false,this.credentialFlag=false }, 3000);
}

// getById(url: string): Observable<any> {
//   return this.http.get<any>(url).pipe(
//     catchError(this.handleError)
//   );
// }


getByPost(url: string, body: any): Observable<any> {
  return this.http.post<any>(url, body, this.httpOptions).pipe(
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
