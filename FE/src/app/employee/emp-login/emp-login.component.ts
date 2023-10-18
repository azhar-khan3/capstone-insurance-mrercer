import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotificationService } from 'src/app/services/notification.service';





@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {

  submitted = false;
  responsedata: any;
  TOKEN_KEY = "Employee";
  TOKEN_KEY1 = "Admin";
  error = false;


  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private notifyService: NotificationService, private adminAuth: AdminAuthService) { }

  ngOnInit(): void {
    // this.authService.getOneEmployeeDetail(Token);
  }

  showToasterError() {

    this.notifyService.showError("Unauthorized User", "Bad");

  }

  userLogin = this.fb.group({

    empEmail: ["", [Validators.required, Validators.pattern('[a-z0-9]+[.]+[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}')]],

    empPswd: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*?[0-9]).{8,}$')]]

  });

  adminLogin = this.fb.group({

    email: ["", [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}')]],

    password: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*?[0-9]).{8,}$')]]

  });


  login(userLogin: FormGroup) {

    this.submitted = true;

    const { value, valid } = userLogin;

    if (valid) {

      this.authService.login(value.empEmail, value.empPswd).subscribe(

        data => {

          this.responsedata = data;

          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.authService.getUserToken()));
          // this.authService.updatemenu.next();
          this.router.navigate(['/profile'])

            .then(() => {

              window.location.reload();

            });

        },
        error => {

          this.error = true;

          this.showToasterError();
          this.userLogin.reset();


        }

      );

    }
  }


  cancel() {
    this.userLogin.reset();
  }

  cancel1() {
    this.adminLogin.reset();
  }

  admin() {
    this.router.navigate(['admin'])
  }



  admlogin(adminLogin: FormGroup) {

    this.submitted = true;

    const { value, valid } = adminLogin;

    if (valid) {

      this.adminAuth.login(value.email, value.password).subscribe(

        data => {

          this.responsedata = data;

          localStorage.setItem(this.TOKEN_KEY1, JSON.stringify(this.authService.getUserToken()));
          // this.authService.updatemenu.next();
          this.router.navigate(['admin'])

            .then(() => {

              window.location.reload();

            });

        },
        error => {

          this.error = true;

          this.showToasterError();
          this.adminLogin.reset();


        }

      );

    }
  }
}
