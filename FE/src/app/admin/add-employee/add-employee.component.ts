import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';


import { EmployeeModel } from './add-employee.model';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  file!: File;
  filename: any = '';
  imageSrc!: string;
  empCompany: any;
  empObj: EmployeeModel = new EmployeeModel();
  loader = false;
  email:any;
  pswd:any

  constructor(private fb: FormBuilder, private empService: EmpServiceService, private notifyService: NotificationService, private adminauth: AdminAuthService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeCompany();
  }

  //here we are not getting company name from frontend so we have use org reference
  getEmployeeCompany() {
    this.empService.getAllEmployeeDetails().subscribe((res) => {
      this.empCompany = res;
      this.empCompany = this.empCompany.name;
    })
  }

  showToasterSuccess() {

    this.notifyService.showSuccess("Employee Registered", "Ok");

  }

  employeeDetails = this.fb.group({
    empName: ["", Validators.required],
    empId: ["", Validators.required],
    empAge: ["", Validators.required],
    empSalary: ["", Validators.required],
    // empPswd: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*?[0-9]).{8,}$')]],
    empAddress: ["", Validators.required],
    empEmail: ["", [Validators.required, Validators.pattern('[a-z0-9]+[.]+[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}')]],
    empMobile: ["", Validators.required],
    empImg: [""]
  });

  getPswd(val:any)
  {
    this.email=val;
    this.email=this.email.split('@');   //deepak.singh3     //@mercer.com
    this.pswd=this.email[0]+'12345';
  }
  
  postEmployee() {
    console.log(this.pswd)
    this.loader = true;
    const formData = new FormData();
    formData.append("empImg", this.file, this.file.name);
    formData.append('empName', this.employeeDetails.get('empName')?.value);
    formData.append('empId', this.employeeDetails.get('empId')?.value);
    formData.append('empSalary', this.employeeDetails.get('empSalary')?.value);
    formData.append('empAge', this.employeeDetails.get('empAge')?.value);
    formData.append('empPswd',this.pswd);
    formData.append('empCompany', this.empCompany);
    formData.append('empAddress', this.employeeDetails.get('empAddress')?.value);
    formData.append('empEmail', this.employeeDetails.get('empEmail')?.value);
    formData.append('empMobile', this.employeeDetails.get('empMobile')?.value);

    this.empService.postEmployee(formData).subscribe((res) => {
      this.loader = false;
      this.showToasterSuccess();
      this.employeeDetails.reset();
      this.router.navigate(['/showEmployee'])
    })
  }
  logout() {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    console.log(this.file)
  }
}