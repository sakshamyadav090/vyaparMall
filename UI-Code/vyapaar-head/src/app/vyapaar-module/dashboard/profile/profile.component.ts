import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData = {}
  loading:boolean=false;
  token:string=undefined
  networkFlag:boolean=false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.loadProfileData()
  }


loadProfileData(){
  this.token=localStorage.getItem('token')
  if(!this.token){
    // this.router.navigate(['home']);
  }else{
    this.getByPost(`http://localhost:9090/auth-service/auth/verify-token/${this.token}`).subscribe(Response=>{
        if(Response.code!=200||!Response.success){
          // this.loading=false;
          // this.router.navigate(['home']);
          this.profileData = Response.data
          console.log(Response.code, Response.sucess)
          console.log(Response.data)
        }else if(Response.code==200&&Response.success){
          this.profileData = Response.data
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

getByPost(url: string): Observable<any> {
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
