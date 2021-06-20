import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,FormControl,Validators}from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employeedashboard.model';
@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
  
    
 formValue !:FormGroup;
 employeeobj :EmployeeModel= new EmployeeModel();
 Employedata !:any;
 showAdd !:boolean;
 showUpdate !:boolean;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      contactno:[''],
      email:[''],
      empid:[''],
    })
    this.getEmployeeDetails();
  }
  clickAdd(){
this.formValue.reset();
this.showAdd=true;
this.showUpdate=false;
  }
 
    postEmployeeDetails()
    {
      this.employeeobj.firstname=this.formValue.value.firstname;
      this.employeeobj.lastname=this.formValue.value.lastname;
      this.employeeobj.contactno=this.formValue.value.contactno;
      this.employeeobj.email=this.formValue.value.email;
      this.employeeobj.empid=this.formValue.value.empid;

      this.api.postEmployee(this.employeeobj)
      .subscribe(res=>{
        console.log(res);
        alert("New Employee has been added Successfully")
        let ref= document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      },
      err=>{
        alert("Error!!!")
      })
      
    }
  
getEmployeeDetails(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.Employedata = res;
  })
}

deleteEmployee(row : any)
{
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee Record has been deleted");
    this.getEmployeeDetails();
  })
}

onEdit(row:any)
{
  this.showAdd=false;
this.showUpdate=true;
  this.employeeobj.id=row.id;
  this.formValue.controls['firstname'].setValue(row.firstname);
  this.formValue.controls['lastname'].setValue(row.lastname);
  this.formValue.controls['contactno'].setValue(row.contactno);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['empid'].setValue(row.empid);
}
updateEmployee()
{
  this.employeeobj.firstname=this.formValue.value.firstname;
  this.employeeobj.lastname=this.formValue.value.lastname;
  this.employeeobj.contactno=this.formValue.value.contactno;
  this.employeeobj.email=this.formValue.value.email;
  this.employeeobj.empid=this.formValue.value.empid;

this.api.updateEmployee(this.employeeobj,this.employeeobj.id)
.subscribe(res=>{
  alert("Employee Record Updated!!");
  let ref= document.getElementById('close')
        ref?.click();
        this.formValue.reset();
  this.getEmployeeDetails();
})
}
}
   
