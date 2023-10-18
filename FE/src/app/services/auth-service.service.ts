//   employee auth service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl="http://localhost:3000/api/v1/employees";
  private userToken:any;
  TOKEN_KEY = "Employee";
  tokenresp: any;

  constructor( private httpClient: HttpClient,  private router: Router ) { }


  login(empEmail: string, empPswd: string) {

    const endpoint = this.apiUrl + "/login";

    const httpParams = {
      empEmail: empEmail,
      empPswd: empPswd
    };
    return this.httpClient
      .post<{ token: string }>(endpoint, httpParams)
      .pipe(
        map(token => {
          this.userToken = token.token;
          this.storeToken();
        })
      );

  }
  storeToken() {
    // localStorage.setItem('token', tokendata.jwtToken);
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());

  }
  getUserToken() {
    return this.userToken || '';
  }

  hasStoredToken() {

    return (

      sessionStorage.getItem(this.TOKEN_KEY) &&

      sessionStorage.getItem(this.TOKEN_KEY)!.length > 0

    );

  }
  clearToken() {

    sessionStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_KEY);

  }
  logout() {

    this.userToken = undefined;
    this.clearToken();

  }

 
}
