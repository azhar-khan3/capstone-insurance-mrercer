import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';


@Component({
  selector: 'app-admin-dashboard.',
  templateUrl: './admin-dashboard..component.html',
  styleUrls: ['./admin-dashboard..component.css']
})
export class AdminComponent implements OnInit {

  
  constructor(private adminauth:AdminAuthService,private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }

}
