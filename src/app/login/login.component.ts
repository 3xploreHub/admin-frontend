import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public emailMessage = false
  public passwordMessage = false
  constructor(private formBuilder: FormBuilder  ) { }
  public credentialsForm = {
    email: "",
    password: ""
  }

  ngOnInit() {
  }
  onSubmit(value:string){
    console.log("value",value);
    
  }
  
}
