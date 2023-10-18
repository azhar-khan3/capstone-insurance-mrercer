import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';


import { PolicyModel } from './add-policy.model';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {

  policyObj:PolicyModel=new PolicyModel();

  constructor(private fb: FormBuilder, private empService:EmpServiceService,private notifyService:NotificationService, private adminauth:AdminAuthService,private router:Router) { }

  ngOnInit(): void {
  }

  policyDetails = this.fb.group({

    PolicyName: ["", Validators.required],
    Dependants: ["", Validators.required],
    Description: ["", Validators.required],
    Age: ["", Validators.required],
    Premium: ["", Validators.required],
    ClaimAmount : ["", Validators.required],
    Duration :["", Validators.required]

  });

  postPolicy()
  {
    this.policyObj.PolicyName=this.policyDetails.value.PolicyName
    this.policyObj.Dependants=this.policyDetails.value.Dependants
    this.policyObj.Description=this.policyDetails.value.Description
    this.policyObj.Age=this.policyDetails.value.Age
    this.policyObj.Premium=this.policyDetails.value.Premium
    this.policyObj.ClaimAmount=this.policyDetails.value.ClaimAmount
    this.policyObj.Duration=this.policyDetails.value.Duration

    this.empService.postPolicy(this.policyObj).subscribe((res)=>{
      this.showToasterSuccess();
      this.policyDetails.reset();
      this.router.navigate(['/showPolicy'])
    })
  }

  showToasterSuccess(){

    this.notifyService.showSuccess("Policy Added Succesfully", "Ok");
    this.policyDetails.reset();
}


logout()
{
  this.adminauth.logout();
  this.router.navigate(['/emplogin']);
}

}
