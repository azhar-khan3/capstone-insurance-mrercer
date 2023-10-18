import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  tokenresp: any;
  empData: any = [];
  empID: any;
  orgId: any;
  clientId: any;
  constructor(private http: HttpClient) { }

  getOneEmployeeDetail(token: any) {
    token = localStorage.getItem("Employee");
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token));
    this.empData = [this.tokenresp.user];
    this.empID = [this.tokenresp.user._id];
    return this.empData;
  }

  //  to post employee inside company
  postEmployee(data: any) {
    return this.http.post('http://localhost:3000/api/v1/employees/org/' + this.orgId, data)
  }

  //for admin portal
  putEmployeeDetails(id: any, data: any) {
    return this.http.patch(`http://localhost:3000/api/v1/employees/${id}`, data);
  }

  //for admin portal
  deleteEmployee(id: any) {
    return this.http.delete(`http://localhost:3000/api/v1/employees/${id}`);
  }


  //organization

  addEmployeeToOrganization(id: any, data: any) {
    return this.http.post('http://localhost:3000/api/v1/employees/org/' + id, data)
  }

  //get all employees from particular org
  getAllEmployeeDetails() {
    console.log(this.orgId)
    return this.http.get("http://localhost:3000/api/v1/employees/org/" + this.orgId);
  }

  getAllorganization() {
    return this.http.get('http://localhost:3000/api/v1/organization');
  }

  postOrganization(data: any) {
    return this.http.post('http://localhost:3000/api/v1/organization', data)
  }

  deleteOrganization(id: any) {
    return this.http.delete('http://localhost:3000/api/v1/organization/' + id);
  }

  updateOrganization(id: any, data: any) {
    return this.http.patch('http://localhost:3000/api/v1/organization/' + id, data);
  }








  //for admin portal
  deletePolicy(id: any) {
    return this.http.delete(`http://localhost:3000/api/v1/policies/${id}`);
  }

  //for admin portal
  putPolicyDetails(id: any, data: any) {
    return this.http.patch(`http://localhost:3000/api/v1/policies/${id}`, data);
  }

  //  all policy table in employee dashboard
  getAllPolicy() {
    return this.http.get("http://localhost:3000/api/v1/policies");
  }

  //  purchased policy by employee
  getBoughtPolicy(id: any) {
    return this.http.get(`http://localhost:3000/api/v1/bought/${id}`);
  }

  // post purchased policy by employee
  postBoughtPolicy(id: any, data: any) {
    return this.http.post(`http://localhost:3000/api/v1/bought/${id}`, data);
  }

  //  post policy inside client
  postPolicy(data: any) {
    return this.http.post('http://localhost:3000/api/v1/policies/client/' + this.clientId, data);
  }

  // to get all policy from particular client
  getAllPolicyDetails() {
    return this.http.get("http://localhost:3000/api/v1/policies/client/" + this.clientId);
  }

  //client
  getAllClient() {
    return this.http.get('http://localhost:3000/api/v1/client');
  }


  postClient(data: any) {
    return this.http.post('http://localhost:3000/api/v1/client', data)
  }

  deleteClient(id: any) {
    return this.http.delete('http://localhost:3000/api/v1/client/' + id);
  }

  updateClient(id: any, data: any) {
    return this.http.patch('http://localhost:3000/api/v1/client/' + id, data);
  }

  // addPolicyToClient(id: any, data: any) {
  //   return this.http.post('http://localhost:3000/api/v1/policies/client/' + id, data)
  // }

  //for admin portal
  // getOnePolicyDetails(id: any) {
  //   return this.http.get(`http://localhost:3000/api/v1/policies/${id}`);
  // }

  //for admin portal
  // getOneEmployeeDetails(id: any) {
  //   return this.http.get(`http://localhost:3000/api/v1/employees/${id}`);
  // }

  //for admin portal
  // getAllEmployeeDetails()
  // {
  //   return this.http.get("http://localhost:3000/api/v1/employees");
  // }
}
