import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../Model/CartItem';
import { FoodItem } from '../Model/FoodItem';
import { CartCommunicationService } from './cart-communication.service';
import { UserService } from './user.service';
import { AppSettings } from '../constants/AppSettings';
import { Order } from '../Model/Order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cartItems: CartItem[] = []
  private baseUrl: string;

  constructor(
    private _http: HttpClient,
    private _cartCommunication: CartCommunicationService,
    private _userService: UserService
  ) { 
    this.baseUrl = AppSettings.API_ENDPOINT;
  }

  addItemToCart(item: FoodItem){

    let itemFound = false;

    for(let i = 0; i < this.cartItems.length; i++){
      if(this.cartItems[i].foodItemId == item.id){
        this.cartItems[i].quantity++;
        this.cartItems[i].cost += item.cost;
        itemFound = true;
      }
    }

    if(!itemFound){
      let newCartItem: CartItem = {
        foodItemId: item.id,
        foodItem: item.name,
        quantity: 1,
        cost: item.cost
      }
      this.cartItems.push(newCartItem);
      this._cartCommunication.notifyCartForNewItem();
    }
  }

  getAllCartItems(){
    return this.cartItems;
  }

  emptyCartItems(){
    this.cartItems = [];
  }

  getAllOrderByUser(){
    let userId = this._userService.getCurrentUser()?.id;

    if(userId == undefined || userId ==null){
      let user = sessionStorage.getItem('user');
      if(user!=null){
        userId = JSON.parse(user).id;
      }
    }
    let orderUrl = this.baseUrl+'/orders';
    return this._http.get<Order[]>(orderUrl);
  }

  addNewOrder(order: Order){
    let orderUrl = this.baseUrl+'/orders';
    order.id = 0;
    return this._http.post(orderUrl, order);
  }

  updateAllOrders(orders: Order[]){
    orders.forEach(order => {
      let url = this.baseUrl+'/orders/'+order.id;
      order.remainingTime = 0;
      order.status = 'Delivered';
      this._http.put(url, order);
    })
  }

}
