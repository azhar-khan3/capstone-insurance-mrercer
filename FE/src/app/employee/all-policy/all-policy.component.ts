import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver}from '@angular/cdk/layout';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-all-policy',
  templateUrl: './all-policy.component.html',
  styleUrls: ['./all-policy.component.css']
})
export class AllPolicyComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empData:any=[];
  policies:any=[];

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  

  constructor(private cdref: ChangeDetectorRef,private observer: BreakpointObserver,private authService:AuthServiceService,private empService:EmpServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getPolicy();
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

    getPolicy(){
      this.empService.getAllPolicy().subscribe((res)=>{
        this.policies=res;
      
      });
    }

    logout()
    {
      this.authService.logout();
      this.router.navigate(['/emplogin']);
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
  

}
