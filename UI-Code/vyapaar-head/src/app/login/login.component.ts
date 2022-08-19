import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      period: ['', Validators.required],
      worker: ['', [Validators.required,Validators.pattern('^[A-Z .]*$'),Validators.maxLength(35)]],
      adpId: ['', [Validators.required,Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(10)]],
      jobTitle: [''],
      role: [''],
      teamSize: ['', [Validators.pattern('^[0-9]*$')]]
    });
  }

  

}
