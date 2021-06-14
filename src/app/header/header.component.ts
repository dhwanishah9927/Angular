import { Component, OnInit } from '@angular/core';
import { LoginCommunicationService } from '../services/login-communication.service';
import { AuthService } from '../services/auth.service';
import { CartCommunicationService } from '../services/cart-communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  itemsInCart: number;
  username: string;

  constructor(
    private _loginCommunication: LoginCommunicationService,
    private _authService: AuthService,
    private _cartCommunication: CartCommunicationService
  ) {
    this.isLoggedIn = false;
    this.username = '';
    this.itemsInCart = 0;
  }

  ngOnInit(): void {
    this._loginCommunication.userLoggedIn.subscribe( isLoggedIn => {
      if(isLoggedIn){
        this.username = this._authService.getLoggedInUser();
        this.isLoggedIn = true;
      } 
      else{
        this.isLoggedIn = false;
      }
    });
    this._cartCommunication.newItemArrival.subscribe( newItem => {
      if(newItem > 0){
        this.itemsInCart++;
      }
    });
    this._cartCommunication.emptyCart.subscribe( res => {
      if(res == true){
        this.itemsInCart = 0;
      }
    });
  }

  logout(){
    this._authService.logout();
  }

}
