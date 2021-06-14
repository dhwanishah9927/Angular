import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../../Model/Address';
import { AddressDetailsService } from '../../services/address-details.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserProfile } from '../../Model/UserProfile';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  addresses: Address[] = []

  constructor(
    private _addressDetailsService: AddressDetailsService,
    private dialog: MatDialog,
    private _authService: AuthService,
    private newAddressAddedBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let userString = sessionStorage.getItem('user');
    let currentUser: UserProfile;
    if(userString!= null){
      currentUser = JSON.parse(userString);
      this._authService.loggedInBySession(currentUser);
    }
    this._addressDetailsService.getAllAddresses().subscribe(res => {
      this.addresses = res;
    });
  }

  addNewAddress(){
    let data = {
      action: 'add'
    }
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.newAddressAddedBar.open('New Address added successfully', '', {
          duration: 3000
        });
      }
    });
  }

  editAddress(address: any){
    console.log('editing:' + address);
    let data = {
      action: 'edit',
      address: address
    }
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.newAddressAddedBar.open('Address edited successfully', '', {
          duration: 3000
        });
      }
    });
  }

  deleteAddress(address: any){
    this._addressDetailsService.deleteAddress(address.id).subscribe(res => {
      if(res){
        this.newAddressAddedBar.open('Address deleted successfully', '', {
          duration: 3000
        });
      }
    })
  }

}
