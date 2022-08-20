import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  typeOfAccount:boolean=false;//false for user and true for supplier
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      role: ['user', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[''],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
    // this.loginForm = this.fb.group({
    //   role: ['', Validators.required],
    //   city: ['', [Validators.required,Validators.pattern('^[A-Z a-z]*$'),Validators.maxLength(10)]],
    //   pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
    //   contactPersonName: ['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(35)]],
    //   mobileNumber: ['',[Validators.required,Validators.pattern('^[0-9]\d{10}$')]],
    //   email: ['', [Validators.email]],
    //   password: ['',Validators.required],
    //   gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
    //   //panCard:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(10)]],
    //   //aadharCard:['',[Validators.pattern('^[0-9]*$'),Validators.maxLength(12),Validators.minLength(12)]],
    //   firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]]
    //   //natureOfBussiness:['',[Validators.required]]
    // });
  }

  createUser():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[''],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }

  createSupplier():FormGroup{
    return this.fb.group({
      role: ['', Validators.required],
      name:['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      email:[null,Validators.required],
      password:[null,Validators.required],
      confirmPassword:['',Validators.required],
      city: ['', [Validators.required,Validators.pattern('^[A-Z a-z]*$'),Validators.maxLength(10)]],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
      //http://postalpincode.in/api/pincode/<your_pin_code>
     // contactPersonName: ['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(35)]],
      gst:['',[Validators.pattern('^[A-Z0-9]*$'),Validators.maxLength(15)]],
      firmName:['',[Validators.required,Validators.pattern('^[A-Z .a-z]*$'),Validators.maxLength(30)]]
    })
  }

  userOrSupplier(typeOfAccount:String){
    // debugger
    if(typeOfAccount=='user'){
      this.loginForm=this.createUser();
      this.typeOfAccount=false;
      this.loginForm.patchValue({
        role: 'user'
      });
    }else if(typeOfAccount=='supplier'){
      this.loginForm=this.createSupplier();
      this.typeOfAccount=true;
      this.loginForm.patchValue({
        role: 'supplier'
      });
    }
  }

  submit(){
    if(this.loginForm.value.password!=this.loginForm.value.confirmPassword){
      alert("Password to same likh de");
    }else{
    console.log(this.loginForm.value);
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(invalid);
  }
}

}
