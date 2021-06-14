import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../Model/Payment';
import { AppSettings } from '../constants/AppSettings';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  // payments: Payment[] = [
  //   {
  //     cardType: 'Debit',
  //     cardVendor: 'Visa',
  //     cardNumber: '1234567890123456',
  //     securityCode: '123',
  //     expirationDate: new Date('01/01/2023')
  //   },
  //   {
  //     cardType: 'Debit',
  //     cardVendor: 'MasterCard',
  //     cardNumber: '1234567890284756',
  //     securityCode: '456',
  //     expirationDate: new Date('01/01/2024')
  //   },
  
  // ];

  baseUrl: string = AppSettings.API_ENDPOINT;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  getAllCards(){
    //get all the cards based on user id 
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }

    let url = this.baseUrl+'/payments?userId='+userId;
    return this._http.get<Payment[]>(url);
  }

  addNewPayment(data: any){
    let url = this.baseUrl+'/payments';
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }
    return this._http.post<Payment>(url, data);
  }

  editPayment(payment: Payment){
    let url = this.baseUrl+'/payments/'+payment.id;
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }
    return this._http.put<Payment>(url, payment);
  }

  deleteAddress(id: number){
    let url = this.baseUrl + '/payments/'+id;
    return this._http.delete(url);
  }

}
