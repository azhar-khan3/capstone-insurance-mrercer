import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-recommended-policy',
  templateUrl: './recommended-policy.component.html',
  styleUrls: ['./recommended-policy.component.css']
})
export class RecommendedPolicyComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empData: any = [];
  policies: any = [];
  productList!: any;
  filterCategory!: any;
  avail = false;
  item: any;
  data: any;
  id: any;
  token: any;
  tokenresp: any;


  constructor(private cdref: ChangeDetectorRef, private fb: FormBuilder, private observer: BreakpointObserver, private authService: AuthServiceService, private empService: EmpServiceService, private router: Router, private notifyService: NotificationService) { }

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
    });
  }

  showToasterSuccess() {

    this.notifyService.showSuccess("Policy has Purchased", "OK");

  }

  recommendedData = this.fb.group({

    Age: ["", Validators.required],
    Dependants: ["", Validators.required],
    Duration: ["", Validators.required],
    Premium: ["", Validators.required],

  });

  getEmployee() {
    this.empData = this.empService.getOneEmployeeDetail(this.authService.getUserToken());

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/emplogin']);
  }

  getPolicy() {
    this.empService.getAllPolicy().subscribe((res) => {
      this.policies = res;
      this.filterCategory = res;
      // console.log(this.policies.Age);
    });
  }

  filter(Age: Number, Duration: Number, Dependants: String, Premium: Number) {

    this.avail = true;
    this.filterCategory = this.policies.filter((a: any) => {

      if (a.Age == Age && a.Duration == Duration && a.Dependants == Dependants && a.Premium == Premium) {

        return a;
      }

    });
  }

  isAvailable() {
    return this.avail;
  }

  sendData(a: any) {
    this.item = {
      "PolicyName": a.PolicyName,
      "Dependants": a.Dependants,
      "Age": a.Age,
      "Premium": a.Premium,
      "Duration": a.Duration,
      "Description": a.Description,
      "ClaimAmount": a.ClaimAmount
    }
    console.log(this.item)
    this.token = localStorage.getItem("Employee");
    let _token = this.token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token));
    this.empData = [this.tokenresp.user];
    this.id = this.tokenresp.user._id;
    this.empService.postBoughtPolicy(this.id, this.item).subscribe((res: any) => {
      this.data = res;
      this.showToasterSuccess();
    })
  }
}
