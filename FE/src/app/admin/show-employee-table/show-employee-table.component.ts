import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeModel } from '../add-employee/add-employee.model';




@Component({
  selector: 'app-show-employee-table',
  templateUrl: './show-employee-table.component.html',
  styleUrls: ['./show-employee-table.component.css']
})
export class ShowEmployeeTableComponent implements OnInit {

  empData:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];

  empObj:EmployeeModel=new EmployeeModel();

  constructor(private fb: FormBuilder,private adminauth:AdminAuthService,private router:Router,private empService:EmpServiceService,private observer: BreakpointObserver,private notify:NotificationService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  showToasterSuccess(){

    this.notify.showSuccess("Employee Updated", "Ok");

}

showToasterSuccess1(){

  this.notify.showSuccess("Employee Deleted", "Ok");

}

  logout()
  {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }


  getEmployee(){
    this.empService.getAllEmployeeDetails().subscribe((allEmployee)=>{
      this.empData=allEmployee;
      this.empData=this.empData.employees;
    });
  }

  delete(id:any)
  {
    this.empService.deleteEmployee(id).subscribe((res) => 
      {
        this.showToasterSuccess1()
        this.getEmployee();
      }
    );
   
  }

  updateEmployee()
  {
   
    this.empObj.empName=this.employeeDetails.value.empName
    this.empObj.empId=this.employeeDetails.value.empId
    this.empObj.empAge=this.employeeDetails.value.empAge
    this.empObj.empSalary=this.employeeDetails.value.empSalary
    this.empObj.empCompany=this.employeeDetails.value.empCompany
    this.empObj.empPswd=this.employeeDetails.value.empPswd
    this.empObj.empAddress=this.employeeDetails.value.empAddress
    this.empObj.empEmail=this.employeeDetails.value.empEmail
    this.empObj.empMobile=this.employeeDetails.value.empMobile

    this.empService.putEmployeeDetails(this.empObj.id,this.empObj).subscribe((res)=>{
      console.log(res)
      this.showToasterSuccess();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getEmployee();

    })
  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getEmployee();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEmployee();
  }

 
  employeeDetails = this.fb.group({

    empName: ["", Validators.required],
    empId: ["", Validators.required],
    empAge: ["", Validators.required],
    empSalary: ["", Validators.required],
    empCompany: ["", Validators.required],
    empPswd: ["", [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*?[0-9]).{8,}$')]],
    empAddress: ["", Validators.required],
    empEmail: ["",[ Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}')]],
    empMobile :["", Validators.required]

  });

  getEmployeeDetailById(item:any){
    this.empObj.id=item._id;
    this.employeeDetails.controls["empName"].setValue(item.empName);
    this.employeeDetails.controls["empId"].setValue(item.empId);
    this.employeeDetails.controls["empAge"].setValue(item.empAge);
    this.employeeDetails.controls["empSalary"].setValue(item.empSalary);
    this.employeeDetails.controls["empCompany"].setValue(item.empCompany);
    this.employeeDetails.controls["empPswd"].setValue(item.empPswd);
    this.employeeDetails.controls["empAddress"].setValue(item.empAddress);
    this.employeeDetails.controls["empEmail"].setValue(item.empEmail);
    this.employeeDetails.controls["empMobile"].setValue(item.empMobile);
}

}
