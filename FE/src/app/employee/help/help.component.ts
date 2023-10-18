import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver}from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { HelpModel } from './help.model';
import { NotificationService } from 'src/app/services/notification.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empData:any=[];
  helpObj:HelpModel=new HelpModel();

  constructor(private cdref: ChangeDetectorRef,private notifyService:NotificationService,private fb: FormBuilder, private observer: BreakpointObserver, private empService:EmpServiceService, private help:HelpService,private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getEmployee();
   
    
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdref.detectChanges();
    });}
    showToasterSuccess(){

      this.notifyService.showSuccess("Will Contact With You", "Message Sent");
  
  }
    contactUsForm = this.fb.group({

      name: ["", Validators.required],
      email : ["", Validators.required],
      mobile :["", Validators.required],
      message:["", Validators.required],
  
    });

    getEmployee(){
      this.empData=this.empService.getOneEmployeeDetail(this.authService.getUserToken());
    }

    logout()
    {
      this.authService.logout();
      this.router.navigate(['/emplogin']);
    }

    sendData(){

      this.helpObj.name=this.contactUsForm.value.name;
      this.helpObj.email=this.contactUsForm.value.email;
      this.helpObj.mobile=this.contactUsForm.value.mobile;
      this.helpObj.message=this.contactUsForm.value.message;

      this.help.postContactUs(this.helpObj).subscribe((res:any)=>{

        this.showToasterSuccess();
        this.contactUsForm.reset();
      })
     
    }

   

}
