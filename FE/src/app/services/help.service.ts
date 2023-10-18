import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http:HttpClient) { }

  postContactUs(data:any){
    return this.http.post('http://localhost:3000/api/v1/contact',data)
  }


  getContactUs(){
    return this.http.get('http://localhost:3000/api/v1/contact');
  }

}
