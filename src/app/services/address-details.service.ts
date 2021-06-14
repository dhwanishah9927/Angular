import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../Model/Address';
import { AppSettings } from '../constants/AppSettings';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AddressDetailsService {

  // address: Address[] = [
  //   {
  //     name: 'main',
  //     address: '8th Main St, Louisville KY-40204'
  //   },
  //   {
  //     name: 'secondary',
  //     address: '1000 Red Stone Way, Louisville KY-40214'
  //   }
  // ]

  baseUrl: string = AppSettings.API_ENDPOINT;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  getAllAddresses(){
    //get it from api later
    //get all the cards based on user id 
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }

    let url = this.baseUrl+'/address?userId='+userId;
    return this._http.get<Address[]>(url);
  }

  addNewAddress(data: any){
    let url = this.baseUrl+'/address';
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }
    return this._http.post<Address[]>(url, data);
  }

  editAddress(address: Address){
    let url = this.baseUrl+'/address/'+address.id;
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }
    return this._http.put<Address[]>(url, address);
  }

  deleteAddress(id: number){
    let url = this.baseUrl + '/address/'+id;
    return this._http.delete(url);
  }

}
