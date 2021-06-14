import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDetailsService } from '../../services/card-details.service';
import { Payment } from '../../Model/Payment';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  paymentFormGroup: FormGroup;
  submitted: boolean;
  submitButton: string;
  
  cardType: string;
  cardVendor: string;
  cardNumber: string;
  securityCode: string;
  expirationDate: string;

  constructor(
    private _fb: FormBuilder,
    private _cardDetailService: CardDetailsService,
    private _userService: UserService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.submitted = false;
    this.cardType= '';
    this.cardVendor= '';
    this.cardNumber= '';
    this.securityCode= '';
    this.expirationDate= '';
    if(data.action == 'edit'){
      console.log('edit form selected')
      this.submitButton = 'Edit';
      this.cardType= data.payment.cardType;
      this.cardVendor= data.payment.cardVendor;
      this.cardNumber= data.payment.cardNumber;
      this.securityCode= data.payment.securityCode;
      this.expirationDate= data.payment.expirationDate;
    }else{
      this.submitButton = 'Add';
    }
    this.paymentFormGroup = this._fb.group({
      cardType: [this.cardType , [Validators.required]],
      cardVendor: [this.cardVendor , [Validators.required]],
      cardNumber: [this.cardNumber , [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]*')]],
      securityCode: [this.securityCode , [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      expirationDate: [this.expirationDate , [Validators.required]]
    });
  }

  ngOnInit(){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.paymentFormGroup.controls;}

  onSubmit(){
    this.submitted = true;
    console.log(this.paymentFormGroup.value);
    if(this.paymentFormGroup.invalid){
      return;
    }
    let user = this._userService.getCurrentUser();
    if(user != undefined){
      //add new address or update to server
      if(this.data.action == 'edit'){
        let editedPayment: Payment = {
          id: this.data.payment.id,
          userId: user.id,
          cardType: this.paymentFormGroup.value.cardType,
          cardVendor: this.paymentFormGroup.value.cardVendor,
          cardNumber: this.paymentFormGroup.value.cardNumber,
          securityCode: this.paymentFormGroup.value.securityCode,
          expirationDate: this.paymentFormGroup.value.expirationDate
        }
        this._cardDetailService.editPayment(editedPayment).subscribe(res => {
          if(res){
            this.dialogRef.close(true);
          }
        });
      } else{
        let newPayment: Payment = {
          id: 0,
          userId: user.id,
          cardType: this.paymentFormGroup.value.cardType,
          cardVendor: this.paymentFormGroup.value.cardVendor,
          cardNumber: this.paymentFormGroup.value.cardNumber,
          securityCode: this.paymentFormGroup.value.securityCode,
          expirationDate: this.paymentFormGroup.value.expirationDate
        }
        this._cardDetailService.addNewPayment(newPayment).subscribe(res => {
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
