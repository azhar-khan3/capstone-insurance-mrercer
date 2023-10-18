import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PolicyModel } from '../add-policy/add-policy.model';




@Component({
  selector: 'app-show-policy-table',
  templateUrl: './show-policy-table.component.html',
  styleUrls: ['./show-policy-table.component.css']
})
export class ShowPolicyTableComponent implements OnInit {

  policyData:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  isOpen=false;

  polObj:PolicyModel=new PolicyModel();

  constructor(private fb: FormBuilder,private adminauth:AdminAuthService,private router:Router,private empService:EmpServiceService,private observer: BreakpointObserver,private notify:NotificationService) { }

  ngOnInit(): void {
    this.getPolicy()
  }

  showToasterSuccess(){

    this.notify.showSuccess("Policy Updated", "Ok");

}

showToasterSuccess1(){

  this.notify.showSuccess("Policy Deleted", "Ok");

}
  logout()
  {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }

  getPolicy(){
    this.empService.getAllPolicyDetails().subscribe((allPolicy)=>{
      this.policyData=allPolicy;
      this.policyData=this.policyData.policies;
    });
  }

  delete(id:any)
  {
    this.empService.deletePolicy(id).subscribe((res) => {
      this.showToasterSuccess1();
      this.getPolicy();
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPolicy();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPolicy();
  }

  updatePolicy()
  {
    
    this.polObj.PolicyName=this.policyDetails.value.PolicyName
    this.polObj.Dependants=this.policyDetails.value.Dependants
    this.polObj.Age=this.policyDetails.value.Age
    this.polObj.Premium=this.policyDetails.value.Premium
    this.polObj.ClaimAmount=this.policyDetails.value.ClaimAmount
    this.polObj.Description=this.policyDetails.value.Description
    this.polObj.Duration=this.policyDetails.value.Duration
    this.empService.putPolicyDetails(this.polObj.id,this.polObj).subscribe((res)=>{
    this.showToasterSuccess();
    let ref=document.getElementById('cancel')
      ref?.click();
      this.getPolicy();
    })
  }

  policyDetails = this.fb.group({

    PolicyName: ["", Validators.required],
    Dependants: ["", Validators.required],
    Age: ["", Validators.required],
    Premium: ["", Validators.required],
    ClaimAmount: ["", Validators.required],
    Description: ["", Validators.required],
    Duration: ["", Validators.required],

  });

  getPolicyDetailById(item:any){
    this.isOpen=true;
    this.polObj.id=item._id;
    this.policyDetails.controls["PolicyName"].setValue(item.PolicyName);
    this.policyDetails.controls["Dependants"].setValue(item.Dependants);
    this.policyDetails.controls["Age"].setValue(item.Age);
    this.policyDetails.controls["Premium"].setValue(item.Premium);
    this.policyDetails.controls["ClaimAmount"].setValue(item.ClaimAmount);
    this.policyDetails.controls["Description"].setValue(item.Description);
    this.policyDetails.controls["Duration"].setValue(item.Duration);
}
}
