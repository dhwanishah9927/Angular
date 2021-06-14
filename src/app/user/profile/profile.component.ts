import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/Model/UserProfile';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserProfile;

  constructor(
    private _userService: UserService
  ) {
    this.userDetails = this._userService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
