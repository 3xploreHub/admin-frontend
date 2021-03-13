import { DialogService } from './../service/dialog.service';
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

  constructor(private authService: AdminService, private router: Router,
     private dialogService: DialogService ) { }

  public eye :boolean=false
  public passwordOrText='password'
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
        this.dialogService.openConfirmedDialog(partialDataHandler.sms)
        this.router.navigate(['']);
      }
    });
  }
  showAndHide(){
   this.eye =!this.eye
  }

  goToAboutPage() {
    this.router.navigate(['About']); // here "About" is name not path
  }

}
