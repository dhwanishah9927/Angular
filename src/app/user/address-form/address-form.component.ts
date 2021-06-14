import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressDetailsService } from '../../services/address-details.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../../Model/Address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  addressFormGroup: FormGroup;
  submitted: boolean;
  submitButton: string;
  name: string;
  address: string;

  constructor(
    private _fb: FormBuilder,
    private _addressDetailService: AddressDetailsService,
    private _userService: UserService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.submitted = false;
    this.name = '';
    this.address = '';
    if(data.action == 'edit'){
      console.log('edit form selected')
      this.submitButton = 'Edit';
      this.name = data.address.name;
      this.address = data.address.address;
    }else{
      this.submitButton = 'Add';
    }
    this.addressFormGroup = this._fb.group({
      name: [this.name, [Validators.required]],
      address: [this.address, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.addressFormGroup.controls;}

  onSubmit(){
    this.submitted = true;
    if(this.addressFormGroup.invalid){
      return;
    }
    let user = this._userService.getCurrentUser();
    if(user != undefined){
      //add new address or update to server
      if(this.data.action == 'edit'){
        console.log('editing address: ');
        let editedAddress: Address = {
          id: this.data.address.id,
          name: this.addressFormGroup.value.name,
          address: this.addressFormGroup.value.address,
          userId: user.id
        }
        this._addressDetailService.editAddress(editedAddress).subscribe(res => {
          if(res){
            this.dialogRef.close(true);
          }
        });
      } else{
        let newAddress: Address = {
          id: 0,
          userId: user.id,
          name: this.addressFormGroup.value.name,
          address: this.addressFormGroup.value.address
        }
        this._addressDetailService.addNewAddress(newAddress).subscribe(res => {
          if(res){
            this.dialogRef.close(true);
          }
        });
      }
    }
    else{
      this.snackbar.open('Error occurred in adding new address', '', {
        duration: 3000
      });
    }

  }

}
