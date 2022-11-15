import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './my-dashboard.model';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder,private api: ApiService) { }
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNo: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.salary = this.formValue.value.salary;

    if(this.employeeModelObj.firstName == null || this.employeeModelObj.lastName == null || this.employeeModelObj.mobileNo == null
      || this.employeeModelObj.email ==  null || this.employeeModelObj.salary == null) {
      alert("Fill the form details")
    }
    else {
      this.api.postEmployee(this.employeeModelObj)
      .subscribe({
        next: (res) => {
          alert("Employee Added Successfully");
          let can = document.getElementById('cancel');
          can?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        error: () => alert("Something went wrong"),
      })
    }
  }

  getAllEmployee() {
    this.api.getEmpolyee()
    .subscribe({
      next: (res) => this.employeeData = res,
    })
  }

  deleteEmployee(emp: any) {
    this.api.deleteEmployee(emp.id)
    .subscribe({
      next: () => {
        alert("Employee Deleted Successfully");
        this.getAllEmployee();
      }
    })
  }

  onEdit(emp: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = emp.id;
    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['email'].setValue(emp.email);
    this.formValue.controls['mobileNo'].setValue(emp.mobileNo);
    this.formValue.controls['salary'].setValue(emp.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.salary = this.formValue.value.salary;

    if(this.employeeModelObj.firstName == "" || this.employeeModelObj.lastName == "" || this.employeeModelObj.mobileNo == ""
      || this.employeeModelObj.email ==  "" || this.employeeModelObj.salary == "") {
      alert("Fill the form details")
    }

    else {
      this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
      .subscribe({
        next: () => {
          alert("Updated Successfully");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        }
      })
    }
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

}

