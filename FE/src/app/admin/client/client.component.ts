import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpServiceService } from 'src/app/services/emp-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ClientModel } from './client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientData: any = [];
  clientObj: ClientModel = new ClientModel();
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  showAdd!: boolean;
  showUpdate!: boolean;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private empService: EmpServiceService, private fb: FormBuilder, private notify: NotificationService) { }


  ngOnInit(): void {
    this.getAllClient();
  }

  showToasterSuccess() {
    this.notify.showSuccess("Client Updated", "Ok");
  }

  addToasterSuccess() {
    this.notify.showSuccess("Client Added", "Ok");
  }

  showToasterSuccess1() {
    this.notify.showSuccess("Client Deleted", "Bad");
  }

  
  clientFormData = this.fb.group({
    clientName: ["", Validators.required],
    location: ["", Validators.required],
    email: ["", Validators.required],
    mobile: ["", Validators.required],
  })

  getAllClient() {
    this.empService.getAllClient().subscribe((res) => {
      this.clientData = res;
      console.log(this.clientData);
    })
  }


  postClient() {
    this.clientObj.clientName = this.clientFormData.value.clientName;
    this.clientObj.location = this.clientFormData.value.location;
    this.clientObj.email = this.clientFormData.value.email;
    this.clientObj.mobile = this.clientFormData.value.mobile;


    this.empService.postClient(this.clientObj).subscribe((res) => {
      console.log('data send');
      this.addToasterSuccess();
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllClient();


    })
  }

  clickAddClient() {
    this.clientFormData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteClient(id: any) {
    this.empService.deleteClient(id).subscribe((res) => {
      this.showToasterSuccess1();
      this.getAllClient();
    })
  }

  getClientDetailById(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.clientObj.id = item._id;
    this.clientFormData.controls["clientName"].setValue(item.clientName);
    this.clientFormData.controls["email"].setValue(item.email);
    this.clientFormData.controls["location"].setValue(item.location);
    this.clientFormData.controls["mobile"].setValue(item.mobile);

  }

  updateClient() {

    this.clientObj.clientName = this.clientFormData.value.name;
    this.clientObj.location = this.clientFormData.value.location;
    this.clientObj.mobile = this.clientFormData.value.mobile;
    this.clientObj.email = this.clientFormData.value.email;

    this.empService.updateClient(this.clientObj.id, this.clientObj).subscribe((res) => {
      this.showToasterSuccess();

      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllClient();
    })
  }

  getIdByClient(id: any) {
    
    this.empService.clientId=id
  
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
