import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  submitted: boolean;

  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.submitted = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    //test the email and send the appropriate response
    this.submitted = true;
    if(form.invalid){
      return;
    }
    console.log(form.value.email);
    this._userService.findUserById(form.value.email).subscribe(res => {
      if(res){
        this.snackBar.open('Link sent to your email', '', {
          duration: 5000
        });
        this._router.navigate(['/login']);
      }
    }, (error) => {
      this.snackBar.open('email not found, please register!', '', {
        duration: 5000
      });
    });
  }

}
