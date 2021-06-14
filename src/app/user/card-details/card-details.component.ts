import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Payment } from 'src/app/Model/Payment';
import { CardDetailsService } from '../../services/card-details.service';
import { CardFormComponent } from '../card-form/card-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile } from '../../Model/UserProfile';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  payments: Payment[] = [];

  constructor(
    private _cardDetailsService: CardDetailsService,
    private dialog: MatDialog,
    private _authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let userString = sessionStorage.getItem('user');
    let currentUser: UserProfile;
    if(userString!= null){
      currentUser = JSON.parse(userString);
      this._authService.loggedInBySession(currentUser);
    }
    this._cardDetailsService.getAllCards().subscribe(res =>{
      this.payments = res;
    });
  }

  getCardLastFourDigit(cardNumber: string){
    return cardNumber.slice(cardNumber.length - 4);
  }

  addNewPayment(){
    let data = {
      action: 'add'
    }
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.snackBar.open('New payment added successfully', '', {
          duration: 3000
        });
      }
    });
  }

  editPayment(payment: any){
    let data = {
      action: 'edit',
      payment: payment
    }
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.snackBar.open('Payment edited successfully', '', {
          duration: 3000
        });
      }
    });
  }

  deletePayment(payment: any){
    this._cardDetailsService.deleteAddress(payment.id).subscribe(res => {
      if(res){
        this.snackBar.open('Payment deleted successfully', '', {
          duration: 3000
        });
      }
    })
  }

}
