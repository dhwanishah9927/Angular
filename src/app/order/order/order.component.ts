import { Component, OnInit } from '@angular/core';
import { Order } from '../../Model/Order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../Model/UserProfile';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  oldOrders: Order[] = [];
  isLoading: boolean = true;
  currentUser: UserProfile | undefined;
  intervals: any[] = [];
  routeParameter: any;
  noOrderFound: boolean;
  noNewOrder: boolean;
  interval: any;

  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
    private _authService: AuthService,
    private snackbar: MatSnackBar,
    private _router: Router
  ) { 
    this.isLoading = true; 
    this.noOrderFound = false;
    this.noNewOrder = false;
    this.routeParameter = this._router.getCurrentNavigation()?.extras.state;

    let userString = sessionStorage.getItem('user');
    if(userString!= null){
      this.currentUser = JSON.parse(userString);
      this._authService.loggedInBySession(this.currentUser);
    }
    if(this.routeParameter != undefined || this.routeParameter != null){
      let newOrder: Order = {
        id: this.routeParameter.id,
        status: this.routeParameter.status,
        remainingTime: this.routeParameter.remainingTime,
        userId: this.routeParameter.userId,
        orderTotal: this.routeParameter.orderTotal
      }
      this.orders.push(newOrder);
      this.isLoading = false;
      this.startTimerForOrders();
    }
    else {
      this.noNewOrder = true;
      this.isLoading = false;
      this.getAllOrders();
    }
  }

  ngOnInit(): void {
  }

  getAllOrders(){
    this._orderService.getAllOrderByUser().subscribe(res => {
      res.forEach(element => {
        if(element.userId == this.currentUser?.id){
          this.oldOrders.push(element);
        }
      });
      if(this.oldOrders.length == 0){
        this.noOrderFound = true;
      }
      this.isLoading = false;
    });
  }

  startTimerForOrders(){
    if(this.orders[0].remainingTime > 0){
      this.interval = setInterval(() => {
        if(this.orders[0].remainingTime > 10){
          this.orders[0].status = 'Placed';
        }
        if(this.orders[0].remainingTime > 1 && this.orders[0].remainingTime <= 10){
          this.orders[0].status = 'Picked Up';
        }
        if(this.orders[0].remainingTime == 0){
          this.orders[0].status = 'Delivered'
          this._orderService.addNewOrder(this.orders[0]).subscribe(res => {
            console.log("newOrder Added!");
          });
        }
        if(this.orders[0].remainingTime < 0){
          clearInterval(this.interval);
        }
        this.orders[0].remainingTime--;
      }, 1000);
    }
  }

  cancelOrder(){
    clearInterval(this.interval);
    this.orders = [];
    this.noNewOrder = true;
    this.snackbar.open('Order Canceled!','', {
      duration: 3000
    })
    this.getAllOrders();
  }

}