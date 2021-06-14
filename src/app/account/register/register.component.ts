import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from 'src/app/_helpers/match-password.validator';
import { User } from '../../Model/User';
import { UserProfile } from '../../Model/UserProfile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private _router: Router
  ) { 
    this.submitted = false;
    this.registerFormGroup = fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  ngOnInit(): void {
  }

  get f() {return this.registerFormGroup.controls;}

  onSubmit(){
    this.submitted = true;
    if(this.registerFormGroup.invalid){
      return;
    }
    let user: UserProfile = {
      id: this.registerFormGroup.value.email,
      name: this.registerFormGroup.value.name,
      password: this.registerFormGroup.value.password,
      phone: '000-000-0000',
      profession: 'User',
      interests: ['Pizza', 'Burger'],
      imageUrl: '/assets/images/profile_pic.png'
    }
    console.log(user);
    //register user using service
    this._userService.addNewUser(user).subscribe(res => {
      console.log(res);
      this.snackBar.open('Registered Successfully', '', {
        duration: 3000
      });
      this._router.navigate(['/login']);
    },
    (error) => {
      console.log(error);
    });
  }

}
