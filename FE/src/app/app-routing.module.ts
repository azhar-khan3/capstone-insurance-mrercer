import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpLoginComponent } from './employee/emp-login/emp-login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { AuthGuard } from './Guards/emp-auth.guard';
import { CartComponent } from './employee/cart/cart.component';
import { AllPolicyComponent } from './employee/all-policy/all-policy.component';
import { RecommendedPolicyComponent } from './employee/recommended-policy/recommended-policy.component';
import { AboutComponent } from './employee/about/about.component';
import { HelpComponent } from './employee/help/help.component';
import { AdminComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './Guards/admin-auth.guard';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddPolicyComponent } from './admin/add-policy/add-policy.component';
import { ShowEmployeeTableComponent } from './admin/show-employee-table/show-employee-table.component';
import { QueryComponent } from './admin/query/query.component';
import { ShowPolicyTableComponent } from './admin/show-policy-table/show-policy-table.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { ClientComponent } from './admin/client/client.component';

const routes: Routes = [

  // Emoloyee Module
  {
    path: 'emplogin',
    component: EmpLoginComponent,

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-policy',
    component: AllPolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recommended',
    component: RecommendedPolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "", 
    redirectTo: "emplogin", 
    pathMatch: "full" 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'addPolicy',
    component: AddPolicyComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'showEmployee',
    component: ShowEmployeeTableComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'showPolicy',
    component: ShowPolicyTableComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'query',
    component: QueryComponent,
    canActivate: [AdminGuard]
  }, {
    path: 'org',
    component: OrganizationComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'client',
    component:ClientComponent,
    canActivate:[AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'emplogin'
  },


];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule { }
