import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { organizationModel } from './org.model';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  orgData: any = [];
  orgObj: organizationModel = new organizationModel();
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  showAdd!: boolean;
  showUpdate!: boolean;
  tableSizes: any = [3, 6, 9, 12];


  constructor(private empService: EmpServiceService, private fb: FormBuilder, private notify: NotificationService) { }

  ngOnInit(): void {
    this.getAllOrganization();
  }

  showToasterSuccess() {
    this.notify.showSuccess("Organization Updated", "Ok");
  }

  addToasterSuccess() {
    this.notify.showSuccess("Organization Added", "Ok");
  }

  showToasterSuccess1() {
    this.notify.showSuccess("Organization Deleted", "Bad");
  }

  orgFormData = this.fb.group({
    name: ["", Validators.required],
    location: ["", Validators.required],
    email: ["", Validators.required],
    mobile: ["", Validators.required],
  })

  getAllOrganization() {
    this.empService.getAllorganization().subscribe((res) => {
      this.orgData = res;
    })
  }

  postOrganization() {
    this.orgObj.name = this.orgFormData.value.name;
    this.orgObj.location = this.orgFormData.value.location;
    this.orgObj.email = this.orgFormData.value.email;
    this.orgObj.mobile = this.orgFormData.value.mobile;
    
    this.empService.postOrganization(this.orgObj).subscribe((res) => {
      console.log('data send');
      this.addToasterSuccess();
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllOrganization();
    })
  }

  clickAddOrganization() {
    this.orgFormData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteOrganization(id: any) {
    this.empService.deleteOrganization(id).subscribe((res) => {
      this.showToasterSuccess1();
      this.getAllOrganization();
    })
  }

  getOrganizationDetailById(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.orgObj.id = item._id;
    this.orgFormData.controls["name"].setValue(item.name);
    this.orgFormData.controls["email"].setValue(item.email);
    this.orgFormData.controls["location"].setValue(item.location);
    this.orgFormData.controls["mobile"].setValue(item.mobile);

  }

  updateOrganization() {

    this.orgObj.name = this.orgFormData.value.name;
    this.orgObj.location = this.orgFormData.value.location;
    this.orgObj.mobile = this.orgFormData.value.mobile;
    this.orgObj.email = this.orgFormData.value.email;

    this.empService.updateOrganization(this.orgObj.id, this.orgObj).subscribe((res) => {
      this.showToasterSuccess();

      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllOrganization();
    })
  }

  getIdByOrganization(id: any) {
    this.empService.orgId=id;
    }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
