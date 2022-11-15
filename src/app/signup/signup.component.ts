import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      mobile: ['',Validators.required]
    })
  }

  signUp() {
    console.log(this.signupForm.value);
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe({
      next: () => {
        alert("Signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error: () => alert("Something went wrong")
    })
  }
}


