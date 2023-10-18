import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private notifyService:NotificationService,private adminauth:AdminAuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.adminauth.logout();
    this.router.navigate(['/emplogin']);
  }

}
