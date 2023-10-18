import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { HelpService } from 'src/app/services/help.service';




@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  query:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private adminauth:AdminAuthService,private router:Router,private service:HelpService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllQuery();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllQuery();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllQuery();
  }

  logout()
  {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }

  getAllQuery()
  {
    this.service.getContactUs().subscribe((res)=>{
      this.query=res;
      console.log(this.query)
    
    });
  }

}
