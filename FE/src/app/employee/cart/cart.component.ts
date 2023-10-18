import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver}from '@angular/cdk/layout';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empData:any=[];
  empData1:any=[];
  boughtData!:any;
  tokenresp: any;
  id:any;

  constructor(private cdref: ChangeDetectorRef,private observer: BreakpointObserver, private authService:AuthServiceService,private empService:EmpServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getBoughtPolicy();
    this.getEmployeeId(this.authService.getUserToken());
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
      this.empData1=this.empService.getOneEmployeeDetail(this.authService.getUserToken());
      
    }

    getEmployeeId(token:any){
      token= localStorage.getItem("Employee");
      let _token = token.split('.')[1];
      this.tokenresp =JSON.parse(atob(_token));
      this.empData=this.tokenresp.user; 
      // console.log(this.empData._id)
      this.id= this.empData._id;
      // console.log(this.id)
    }

    logout()
    {
      this.authService.logout();
      this.router.navigate(['/emplogin']);
    }

    getBoughtPolicy(){
      
      this.empService.getBoughtPolicy(this.empData1[0]._id).subscribe((res:any)=>{
        this.boughtData=res;
        this.boughtData=this.boughtData.policies;
        console.log(this.empData1[0]._id);
      })
    }

    

}
