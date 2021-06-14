import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../Model/CartItem';
import { OrderService } from '../../services/order.service';
import { Order } from '../../Model/Order';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartCommunicationService } from '../../services/cart-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
    private _router: Router,
    private _cartCommunication: CartCommunicationService,
    private emptyCartSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cartItems = this._orderService.getAllCartItems();
    this.cartItems.forEach(element => {
      this.cartTotal += element.cost;
    });
  }

  placeOrder(){
    let id = this._userService.getCurrentUser()?.id;
    if(this.cartItems.length == 0){
      this.emptyCartSnackBar.open('Cart is Empty!', '', {
        duration: 3000 
      });
      return;
    }
    if(id != undefined){
      let newOrder: Order = {
        id: this.generateNewOrderId(),
        status: 'Placed',
        remainingTime: 25,
        userId:id,
        orderTotal: this.cartTotal
      }
      this._cartCommunication.emptyCartItems();
      this._orderService.emptyCartItems();
      this.cartItems = this._orderService.getAllCartItems();
      this.cartTotal = 0;
      this._router.navigate(['/orders',], {state: newOrder});
    } else{
      console.log('error occurred in placing order');
    }
  }

  generateNewOrderId() {
    return Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
  }

}
