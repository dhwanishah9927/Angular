import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../Model/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  submitted: boolean;
  //loginSuccess: boolean;
  //showToast: boolean;
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _loginSuccessBar: MatSnackBar,
    private _loginFailBar: MatSnackBar
  ) {
    this.isLoading = true; 
    this.submitted = false;
    //this.loginSuccess = false;
    //this.showToast = false;
    this.loginFormGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    //check if the user logged in the same session of browser
    let userString = sessionStorage.getItem('user');
    let user: any;
    if(userString != null){
      user = JSON.parse(userString);
    }
    if(user != null || user != undefined){
      this._authService.loggedInBySession(user);
      this._router.navigate(['/home']);
    }
    else{
      this.isLoading = false;
    }
  }

  get f() {return this.loginFormGroup.controls;}

  onSubmit(){
    //validate the form then route to home
    this.submitted = true;
    if(this.loginFormGroup.invalid){
      return;
    }
    let user: User = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password,
      name: ''
    }
    this._authService.login(user).subscribe(res => {
      if(res == true){
          this._loginSuccessBar.open("Login Successful!", "", {duration: 5000} );
          this._router.navigate(['/home']);
      }
      else{
        this._loginSuccessBar.open("Invalid Credential!", "", {duration: 5000} );
      }
    }, (error)=> {
      this._loginSuccessBar.open("Login Failed!", "", {duration: 5000} );
    });
  }
}
