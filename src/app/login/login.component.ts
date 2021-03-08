import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AdminService, private router: Router) { }

  public credentialsForm = {
    username: "",
    password: ""
  }
  public serverErrorMessages = "";
  ngOnInit() {

  }
  onSubmit() {
    var partialDataHandler;
    this.authService.login(this.credentialsForm).subscribe((user) => {
      partialDataHandler = user
      if (partialDataHandler.status != false) {
        this.authService.setToken(user['token'])
        this.router.navigate(['notif']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: partialDataHandler.sms,
        })
        this.router.navigate(['']);
      }
    });
  }

  goToAboutPage() {
    this.router.navigate(['About']); // here "About" is name not path
  }

}
