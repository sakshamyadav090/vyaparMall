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
  loginForm:FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password:['',Validators.required]
    });
  }


  submit(){
    if(this.loginForm.valid){
      let loginJson = {
        "userName": this.loginForm.controls["userName"].value,
        "password": this.loginForm.controls["password"].value
      };
      this.getByPost('http://localhost:8080/auth/login',loginJson).subscribe(Response=>{
        console.log(Response);
        },
        err => {
          alert('nhi ho rha bhaiya');
          //this.messageService.add({severity:'error',detail:'Error while fetching city'});
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
