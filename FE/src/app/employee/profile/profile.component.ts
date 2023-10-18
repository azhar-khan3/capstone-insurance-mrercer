import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver}from '@angular/cdk/layout';


import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public empData: any=[];
  tokenresp:any;
  
  constructor(private observer: BreakpointObserver,private cdref: ChangeDetectorRef,private authService:AuthServiceService,private empService:EmpServiceService,private router:Router) { }

 
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


    getEmployee(){
      this.empData=this.empService.getOneEmployeeDetail(this.authService.getUserToken());
    }

    logout()
    {
      this.authService.logout();
      this.router.navigate(['/emplogin']);
    }

}
