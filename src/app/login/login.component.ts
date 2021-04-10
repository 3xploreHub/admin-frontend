import { DialogService } from './../service/dialog.service';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AdminService, private router: Router,
              private dialogService: DialogService ) { }
  public alert = false;
  public eye = false;
  public passwordOrText = 'password';
  public credentialsForm = {
    username: '',
    password: ''
  };
  public serverErrorMessages = '';
  ngOnInit() {

  }
  onSubmit() {
    let partialDataHandler;
    this.authService.login(this.credentialsForm).subscribe((user:any) => {
      partialDataHandler = user;
      if (partialDataHandler.status != false) {
        this.authService.setToken(user.token);
        console.log(user)
        this.router.navigate(['bookingNotif']);
      } else {
        // if(!this.alert ){
          !this.alert
          this.dialogService.openConfirmedDialog(partialDataHandler.sms);
          this.router.navigate(['']);
        // }
       
      }
    });
  }
  showAndHide(){
   this.eye = !this.eye;
  }

  goToAboutPage() {
    this.router.navigate(['About']); // here "About" is name not path
  }

}
