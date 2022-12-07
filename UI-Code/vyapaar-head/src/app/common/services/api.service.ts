import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { map, concatAll, catchError, retry } from 'rxjs/operators';
import { GlobalEventsManager } from './global-events-manager';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http: HttpClient) {

  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
  }


  list(url: string): Observable<any> {
    //  let commissionPlansdata = "assets/data/commissionPlans.json";
    return this.http.get<any>(url, this.httpOptions1);
  }

  deny(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, this.httpOptions1).pipe(
      catchError(this.handleError)

    );
  }

  getById(url: string, body: any): Observable<any> {
    return this.http.get<any>(url + body, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })}).pipe(
      catchError(this.handleError)
    );
  }

  getCity(url: string, body: any): Observable<any> {
    // return this.http.get<any>(url + body, {headers: new HttpHeaders({
    //   'Content-Type': 'application/json'
    // })}).pipe(
    //   catchError(this.handleError)
    // );
    return this.http.get<any>(url + body).pipe(
      catchError(this.handleError)
    );
  }

  getWithoutId(url: string): Observable<any> {
    return this.http.get<any>(url,this.httpOptions1).pipe(
      catchError(this.handleError)
    );
  }

  save(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, this.httpOptions).pipe(
      catchError(this.handleError)

    );
  }

  saveWithHeader(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, this.httpOptions1).pipe(
      catchError(this.handleError)

    );
  }

  update(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  approveProd(url: string, body: any): Observable<any> {
    return this.http.patch<any>(url, body, this.httpOptions1).pipe(
      catchError(this.handleError)
    );
  }

  approve(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, this.httpOptions1).pipe(
      catchError(this.handleError)
    );
  }

  updatePassword(url: string, body: any): Observable<any> {
    return this.http.patch<any>(url, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string, id: string): Observable<any> {
    return this.http.delete<any>(url + id, this.httpOptions1).pipe(
      catchError(this.handleError)
    );
  }

  /**
     * Post
     * @param url
     * @param body
     */


  //  Get$(url: string): Observable<any> {

  //   let finalUrl = environment.baseUrl + '/' + url;

  //   return this.http.get<any>(finalUrl)

  //     .pipe(map(response => {

  //       return response;

  //     }));

  // }

  // Post$(url: string, data: any): Observable<any> {
  //   return this.http.post<any>(url, data)
  //     .pipe(map(response => {
  //       return response;
  //     }));
  // }

  getByPost(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  verifyOtp(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  sendOTP(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // public post(url: string, body: any) {

  //   return this.http.post(url, body).pipe(
  //     catchError((e) => this.handleError(e))
  //   );
  // }

  /**
   * get
   * @param url
   * @param options
   */
  public get(url: string, options?: HttpParams) {
    let commissionPlansdata = "assets/data/commissionPlans.json";
    return this.http.get(commissionPlansdata)
      .pipe(
        catchError((e) => this.handleError(e))
      )

  }


  /**
    * handleError
    * @param response
    */
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


  exceptionList(url: string): Observable<any> {
    //  let commissionPlansdata = "assets/data/commissionPlans.json";
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }


  exceptionListByCode(url: string): Observable<any> {
    //  let commissionPlansdata = "assets/data/commissionPlans.json";
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getRoles() {

    let roles: any = [];
    roles = [
      {
        "label": "BDM",
        "value": "BDM"
      },
      {
        "label": "REC",
        "value": "REC"
      },
      {
        "label": "CSM",
        "value": "CSM"
      }, {
        "label": "BDM_OVR",
        "value": "BDM_OVR"
      }, {
        "label": "REC_OVR",
        "value": "REC_OVR"
      }
    ];
    return roles;
  }

  getData(url1, url2): Observable<any> {
    const response1 = this.http.get<any>(url1);
    const response2 = this.http.get<any>(url2);
    return forkJoin([response1, response2]);
  }


  getDatafor4Apis(url1, url2, url3, url4): Observable<any> {
    const response1 = this.http.get<any>(url1);
    const response2 = this.http.get<any>(url2);
    const response3 = this.http.get<any>(url3);
    const response4 = this.http.get<any>(url4);
    return forkJoin([response1, response2, response3, response4]);
  }



  getDataFor3Apis(url1, url2, url3): Observable<any> {
    const response1 = this.http.get<any>(url1);
    const response2 = this.http.get<any>(url2);
    const response3 = this.http.get<any>(url3);
    return forkJoin([response1, response2, response3]);
  }

}
