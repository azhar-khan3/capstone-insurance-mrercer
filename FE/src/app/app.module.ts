import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './Guards/emp-auth.guard';


import { EmpServiceService } from './services/emp-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { AdminAuthService } from './services/admin-auth.service';
import { HelpService } from './services/help.service';
import { NotificationService } from './services/notification.service';


import { AboutComponent } from './employee/about/about.component';
import { AllPolicyComponent } from './employee/all-policy/all-policy.component';
import { CartComponent } from './employee/cart/cart.component';
import { EmpLoginComponent } from './employee/emp-login/emp-login.component';
import { HelpComponent } from './employee/help/help.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { RecommendedPolicyComponent } from './employee/recommended-policy/recommended-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddPolicyComponent } from './admin/add-policy/add-policy.component';
import { AdminComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { QueryComponent } from './admin/query/query.component';
import { ShowEmployeeTableComponent } from './admin/show-employee-table/show-employee-table.component';
import { ShowPolicyTableComponent } from './admin/show-policy-table/show-policy-table.component';
import { AdminGuard } from './Guards/admin-auth.guard';
import { OrganizationComponent } from './admin/organization/organization.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { ClientComponent } from './admin/client/client.component';
import { NgxUiLoaderModule,  NgxUiLoaderHttpModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AllPolicyComponent,
    RecommendedPolicyComponent,
    CartComponent,
    EmpLoginComponent,
    HelpComponent,
    AboutComponent,
    AdminComponent,
    AddEmployeeComponent,

    AddPolicyComponent,
    ShowEmployeeTableComponent,
    ShowPolicyTableComponent,
    QueryComponent,
    OrganizationComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true}),
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  
    
  
    
  ],
  providers: [AuthGuard, AdminGuard, EmpServiceService, AuthServiceService, AdminAuthService, HelpService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
